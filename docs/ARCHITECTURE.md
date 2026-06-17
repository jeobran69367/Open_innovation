# Guide d'Architecture

## 🏗️ Architecture Globale

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 14)                     │
│              (Vercel) - nextjs.org/docs/app                │
└──────────────────┬──────────────────────────────────────────┘
                   │ REST API / HTTP
┌──────────────────▼──────────────────────────────────────────┐
│                  Backend (FastAPI 0.110)                     │
│                    (Railway.app)                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Layer (FastAPI)                      │  │
│  │  - Auth endpoints (GitHub OAuth)                      │  │
│  │  - Project endpoints (CRUD + search)                  │  │
│  │  - User endpoints                                     │  │
│  │  - Comments & Recommendations                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ▲                                   │
│         ┌────────────────┼────────────────┐                 │
│         │                │                │                 │
│  ┌──────▼────────┐  ┌───▼────────┐  ┌───▼────────┐        │
│  │ Services Layer │  │ AI/RAG Svc │  │ GitHub Svc │        │
│  │  - Business    │  │ - LangChain│  │ - PyGithub │        │
│  │    logic       │  │ - OpenAI   │  │ - Analysis │        │
│  │  - Validators  │  │ - Qdrant   │  │ - Metrics  │        │
│  └────────┬───────┘  └────┬───────┘  └────┬───────┘        │
│           │                │                │                │
│  ┌────────▼── Data Layer ──▼─────────────▼──┐               │
│  │  SQLAlchemy ORM Models & Repositories    │               │
│  └──────────────────┬──────────────────────┘               │
│                     │                                       │
└─────────────────────┼───────────────────────────────────────┘
                      │
     ┌────────────────┼────────────────┬──────────────┐
     │                │                │              │
┌────▼────────┐  ┌───▼────────┐  ┌───▼───────┐  ┌──▼──────┐
│ PostgreSQL  │  │ Redis      │  │ Qdrant    │  │ External│
│ (Data Store)│  │(Cache/Sess)│  │(Vector DB)│  │APIs     │
│             │  │            │  │           │  │(GitHub) │
└─────────────┘  └────────────┘  └───────────┘  └─────────┘
```

---

## 📊 Flux de Découverte de Projets

```
1. GitHub Scraping (Celery)
   └─> PyGithub API
   └─> Extraction metadata (stars, forks, issues, etc.)

2. Analysis Pipeline
   └─> Data validation & cleaning
   └─> Metrics calculation
   └─> Quality scoring (AI model)
   └─> Automatic categorization

3. Vectorization & Indexing
   └─> sentence-transformers embeddings
   └─> Storage in Qdrant
   └─> Metadata in PostgreSQL

4. Search & Retrieval (RAG)
   └─> User query → embedding
   └─> Vector similarity search
   └─> Re-ranking with LLM
   └─> Result set to user

5. User Interaction
   └─> Comments & ratings
   └─> Favorites/bookmarks
   └─> Personalized recommendations
```

---

## 🔐 Authentication Flow

```
1. User clicks "Login with GitHub"
   ↓
2. Redirect to GitHub OAuth
   ↓
3. GitHub Authorization → Callback
   ↓
4. Backend: Exchange code for access token
   ↓
5. Fetch user info via GitHub API
   ↓
6. Create/Update user in PostgreSQL
   ↓
7. Generate JWT token
   ↓
8. Redirect to frontend with JWT
   ↓
9. Store in secure HTTP-only cookie
   ↓
10. User authenticated for future requests
```

---

## 🤖 RAG Pipeline (Simplified)

```
Document Processing:
├─ GitHub projects metadata
├─ READMEs & documentation
├─ Issues & discussions
└─ Metadata extraction

Vector Transformation:
├─ Text chunking
├─ Embedding with sentence-transformers
└─ Store in Qdrant

Search & Retrieval:
├─ User query embedding
├─ Vector similarity search (Qdrant)
├─ Retrieve top-k relevant projects
├─ Re-rank with LLM
└─ Generate contextual response

Example Flow:
User: "Je cherche une lib Python pour tester"
  ↓
Framework RAG:
  1. Embed query
  2. Search Qdrant → [Project1, Project2, Project3]
  3. Fetch full context from PostgreSQL
  4. Pass to GPT-4o: "Rank these by relevance"
  5. Return ranked results with explanations
```

---

## 🔄 Celery Task Queue

### Scheduled Tasks:
- **github_sync** (toutes les 6h) - Synchronisation GitHub
- **quality_analysis** (quotidien) - Réévaluation qualité
- **index_cleanup** (hebdomadaire) - Maintenance Qdrant

### Triggered Tasks:
- **analyze_new_project** - Analyse nouveau projet
- **update_embeddings** - Mise à jour vecteurs
- **send_notifications** - Notifications utilisateurs

```python
# Celery Configuration
CELERY_BROKER_URL = "redis://redis:6379/1"
CELERY_RESULT_BACKEND = "redis://redis:6379/2"

# Beat Scheduler (Celery Beat)
from celery.schedules import crontab
app.conf.beat_schedule = {
    'sync-github': {
        'task': 'app.tasks.github_sync',
        'schedule': crontab(minute=0, hour='*/6'),
    },
    'analyze-quality': {
        'task': 'app.tasks.analysis.run_quality_analysis',
        'schedule': crontab(minute=0, hour=2),  # 2am daily
    },
}
```

---

## 📱 API Design

### Versioning
- `/api/v1/` - Current version
- Future: `/api/v2/`, `/api/v3/`, etc.

### Key Endpoints

```
Authentication:
POST   /api/v1/auth/github/login      - Start GitHub OAuth
GET    /api/v1/auth/github/callback   - OAuth callback
POST   /api/v1/auth/logout            - Logout
GET    /api/v1/auth/me                - Current user

Projects:
GET    /api/v1/projects               - List projects (paginated)
GET    /api/v1/projects/{id}          - Project detail
GET    /api/v1/projects/search        - Search (RAG)
POST   /api/v1/projects/{id}/comments - Add comment
GET    /api/v1/projects/{id}/comments - Get comments

Users:
GET    /api/v1/users/{id}             - User profile
GET    /api/v1/users/{id}/favorites   - User favorites
POST   /api/v1/users/{id}/favorites   - Add favorite

Recommendations:
GET    /api/v1/recommendations        - Personalized recommendations
```

---

## 🗄️ Database Schema (Simplified)

```sql
-- Users
users
├─ id (PK)
├─ github_id (UK)
├─ username
├─ email
├─ avatar_url
└─ created_at

-- Projects
projects
├─ id (PK)
├─ github_url (UK)
├─ name
├─ description
├─ language
├─ quality_score
├─ maturity_level
├─ category
├─ stars
├─ forks
├─ last_commit_at
├─ embedding_id (FK→qdrant)
└─ github_metadata (JSON)

-- Comments
comments
├─ id (PK)
├─ project_id (FK)
├─ user_id (FK)
├─ content
├─ created_at
└─ edited_at

-- User Favorites
favorites
├─ id (PK)
├─ user_id (FK)
├─ project_id (FK)
└─ created_at
```

---

## 🚀 Deployment Architecture

### Development (Local)
- Docker Compose orchestrates all services
- PostgreSQL, Redis, Qdrant run locally
- Hot reload for backend & frontend

### Production (Railway + Vercel)
```
GitHub → Push
   ↓
GitHub Actions CI/CD
   ├─ Run tests
   ├─ Build Docker image
   └─ Push to registry
   
Railway (Backend)
├─ PostgreSQL (managed)
├─ Redis (managed)
├─ FastAPI application
└─ Qdrant (containerized)

Vercel (Frontend)
├─ Next.js build
├─ Static assets CDN
├─ Edge runtime for API routes
└─ Environment variables
```

---

## 🔒 Security Considerations

1. **Authentication**: GitHub OAuth 2.0
2. **Authorization**: Role-based access (user, moderator, admin)
3. **API Security**:
   - Rate limiting (Redis)
   - CORS configuration
   - HTTPS only
   - CSRF protection
4. **Data Protection**:
   - Secrets in environment variables
   - Hashed passwords (bcrypt)
   - SQL injection prevention (SQLAlchemy ORM)
5. **Monitoring**:
   - Logging errors and suspicious activities
   - Performance monitoring
   - Security headers (HSTS, CSP, etc.)

---

## 📈 Scalability Plan

### Phase 1 (Current - MVP)
- Single PostgreSQL instance
- Redis for caching
- Qdrant for vectors
- Celery workers on same instance

### Phase 2 (Growth)
- PostgreSQL read replicas
- Distributed Redis cluster
- Multiple Celery workers
- Load balancing (async workers)

### Phase 3 (Enterprise)
- Database sharding strategy
- Kafka for event streaming
- Microservices decomposition
- Kubernetes orchestration

---

**Last Updated**: June 2026
