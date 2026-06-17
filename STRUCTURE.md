# Open Innovation - Project Structure Summary

```
Open_inovation/
│
├── 📄 README.md                      # Project overview
├── 📄 LICENSE                        # MIT License
├── 📄 .gitignore                     # Git ignore rules
├── 📄 .env.example                   # Environment variables template
│
├── 🐳 docker-compose.yml             # Docker Compose orchestration
│
├── 🔧 .github/
│   └── workflows/
│       ├── backend-tests.yml         # Backend testing CI/CD
│       ├── frontend-build.yml        # Frontend build CI/CD
│       └── backend-deploy.yml        # Backend deployment workflow
│
├── 📚 docs/
│   ├── README.md                     # Documentation index
│   ├── GETTING_STARTED.md            # Quick start guide
│   ├── PROJECT_STRUCTURE.md          # Detailed structure explanation
│   ├── ARCHITECTURE.md               # System architecture & design
│   └── CONTRIBUTING.md               # Contribution guidelines
│
├── ⚙️ backend/
│   ├── 📄 requirements.txt            # Python dependencies
│   ├── 📄 .env.example               # Backend env template
│   ├── 📄 Dockerfile                 # Backend Docker image
│   ├── 📄 celery_app.py              # Celery configuration
│   │
│   └── app/
│       ├── 📄 __init__.py
│       ├── 📄 main.py                # FastAPI application entry point
│       │
│       ├── core/                     # Core configuration
│       │   ├── __init__.py
│       │   ├── config.py             # Pydantic settings
│       │   └── security.py           # Auth & JWT handling
│       │
│       ├── api/                      # API endpoints
│       │   ├── __init__.py
│       │   └── v1/
│       │       ├── __init__.py
│       │       ├── api.py            # Router configuration
│       │       └── endpoints/
│       │           ├── __init__.py
│       │           ├── auth.py       # Authentication endpoints
│       │           ├── projects.py   # Project CRUD endpoints
│       │           ├── search.py     # RAG search endpoints
│       │           ├── users.py      # User endpoints
│       │           └── comments.py   # Comments endpoints
│       │
│       ├── models/                   # SQLAlchemy ORM models
│       │   └── __init__.py
│       │
│       ├── schemas/                  # Pydantic validation schemas
│       │   └── __init__.py
│       │
│       ├── services/                 # Business logic layer
│       │   ├── __init__.py
│       │   ├── github/               # GitHub API integration
│       │   │   └── __init__.py
│       │   ├── ai/                   # AI/ML services
│       │   │   └── __init__.py
│       │   └── rag/                  # RAG pipeline
│       │       └── __init__.py
│       │
│       ├── tasks/                    # Celery async tasks
│       │   └── __init__.py
│       │
│       ├── db/                       # Database configuration
│       │   ├── __init__.py
│       │   └── session.py            # SQLAlchemy session setup
│       │
│       └── utils/                    # Utility functions
│           └── __init__.py
│
│   └── tests/                        # Backend tests
│       └── __init__.py
│
├── 🎨 frontend/
│   ├── 📄 package.json               # Node dependencies & scripts
│   ├── 📄 .env.example               # Frontend env template
│   ├── 📄 Dockerfile                 # Frontend Docker image
│   ├── 📄 next.config.js             # Next.js configuration
│   ├── 📄 tsconfig.json              # TypeScript config
│   ├── 📄 tailwind.config.ts         # Tailwind CSS config
│   ├── 📄 postcss.config.js          # PostCSS config
│   │
│   └── src/
│       ├── app/                      # App Router (Next.js 14)
│       │   ├── layout.tsx            # Root layout
│       │   ├── page.tsx              # Home page
│       │   └── (routes)/             # Route groups (TBD)
│       │
│       ├── components/               # Reusable React components
│       │   ├── ui/                   # ShadCN/UI components
│       │   └── features/             # Feature-specific components
│       │
│       ├── lib/                      # Utility libraries
│       │   └── api.ts                # API client (Axios-like)
│       │
│       ├── services/                 # API service functions
│       │   ├── projectService.ts     # Project API calls
│       │   └── searchService.ts      # Search API calls
│       │
│       ├── hooks/                    # Custom React hooks
│       │   └── (TBD)
│       │
│       ├── types/                    # TypeScript type definitions
│       │   └── index.ts              # Global types
│       │
│       └── styles/                   # Global styles
│           └── globals.css           # Tailwind directives
│
├── 🚀 devops/
│   ├── docker/                       # Docker-related files
│   └── kubernetes/                   # K8s manifests (future)
│
└── 📊 Development Info
    ├── Backend: Python 3.12 + FastAPI
    ├── Frontend: Next.js 14 + React 18
    ├── Database: PostgreSQL 16
    ├── Cache: Redis 7
    ├── Vector DB: Qdrant 1.9
    ├── AI: LangChain + OpenAI GPT-4o
    ├── Task Queue: Celery 5.3
    └── Deployment: Railway (backend) + Vercel (frontend)
```

## 📋 Key Files at a Glance

| File | Purpose |
|------|---------|
| `README.md` | Project overview & features |
| `docker-compose.yml` | Local development environment |
| `backend/app/main.py` | FastAPI app entry point |
| `frontend/src/app/page.tsx` | Home page component |
| `backend/app/core/config.py` | Configuration management |
| `.github/workflows/` | CI/CD pipelines |
| `docs/ARCHITECTURE.md` | System design & flows |

## 🎯 Next Steps

1. **Read the Getting Started Guide**: `docs/GETTING_STARTED.md`
2. **Start the Stack**: `docker-compose up -d`
3. **Access API Docs**: http://localhost:8000/docs
4. **View Frontend**: http://localhost:3000
5. **Begin Development**: Check `docs/CONTRIBUTING.md`

---

**Platform**: Open Innovation | **Version**: 0.1.0 | **Last Updated**: June 2026
