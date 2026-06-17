# Documentation Project Structure

## 📚 Backend Structure

### `app/api/`
- **v1/endpoints/** - Points d'accès API versionnés
  - `projects.py` - Endpoints pour les projets
  - `search.py` - Endpoints de recherche RAG
  - `auth.py` - Endpoints d'authentification
  - `users.py` - Endpoints utilisateurs
  - `comments.py` - Endpoints commentaires
  - `recommendations.py` - Endpoints recommandations

### `app/models/`
- **Base de données ORM SQLAlchemy**
  - `project.py` - Modèle Project
  - `user.py` - Modèle User
  - `github_metadata.py` - Métadonnées GitHub
  - `embedding.py` - Embeddings vectoriels
  - `comment.py` - Commentaires
  - `recommendation.py` - Recommandations

### `app/schemas/`
- **Schémas Pydantic de validation**
  - `project.py` - ProjectCreate, ProjectUpdate, ProjectResponse
  - `user.py` - UserCreate, UserLogin, UserResponse
  - `search.py` - SearchQuery, SearchResult
  - `github.py` - GitHubMetadata schemas

### `app/services/`
- **Logique métier**
  - `project_service.py` - Gestion des projets
  - `user_service.py` - Gestion des utilisateurs
  - `github/` - Intégration GitHub API
    - `github_scraper.py` - Scraping repositories
    - `github_analyzer.py` - Analyse des repos
  - `ai/` - Services d'intelligence artificielle
    - `quality_scorer.py` - Scoring de qualité
    - `categorizer.py` - Catégorisation
  - `rag/` - Système RAG
    - `embedder.py` - Création d'embeddings
    - `retriever.py` - Récupération sémantique
    - `rag_pipeline.py` - Pipeline RAG complet

### `app/tasks/`
- **Tâches Celery asynchrones**
  - `github_sync.py` - Synchronisation GitHub
  - `analysis.py` - Analyse de projets
  - `indexing.py` - Indexation vectorielle
  - `cleanup.py` - Nettoyage des données

### `app/db/`
- **Configuration base de données**
  - `session.py` - Session SQLAlchemy
  - `base.py` - Classe de base
  - `migrations/` - Scripts Alembic

### `app/core/`
- **Configuration générale**
  - `config.py` - Settings Pydantic
  - `security.py` - Authentification & autorisation
  - `constants.py` - Constantes métier

### `app/utils/`
- **Utilitaires**
  - `logger.py` - Logging
  - `helpers.py` - Fonctions utiles
  - `validators.py` - Validations métier

---

## 🎨 Frontend Structure

### `src/app/`
- **[App Router Next.js 14](https://nextjs.org/docs/app)**
  - `page.tsx` - Page d'accueil
  - `layout.tsx` - Layout global
  - `(auth)/` - Routes d'authentification
    - `login/page.tsx`
    - `callback/github/page.tsx`
  - `(dashboard)/` - Routes protégées
    - `projects/page.tsx`
    - `projects/[id]/page.tsx`
    - `dashboard/page.tsx`
    - `profile/page.tsx`

### `src/components/`
- **Composants réutilisables**
  - `ui/` - Composants ShadCN/UI
    - `button.tsx`
    - `input.tsx`
    - `card.tsx`
    - etc.
  - `features/` - Composants métier
    - `ProjectCard.tsx`
    - `SearchBar.tsx`
    - `ProjectDetail.tsx`
    - `CommentSection.tsx`
    - `Navigation.tsx`
    - `UserMenu.tsx`

### `src/lib/`
- **Utilitaires**
  - `api.ts` - Client API Axios
  - `auth.ts` - Gestion authentification
  - `utils.ts` - Fonctions utiles

### `src/hooks/`
- **Custom React Hooks**
  - `useProjects.ts` - Hook pour projets
  - `useSearch.ts` - Hook pour recherche
  - `useAuth.ts` - Hook authentification
  - `useInfiniteScroll.ts` - Hook scroll infini

### `src/services/`
- **Services API**
  - `projectService.ts` - Appels API projets
  - `searchService.ts` - Appels API recherche
  - `userService.ts` - Appels API utilisateurs
  - `authService.ts` - Appels API auth

### `src/types/`
- **Définitions TypeScript**
  - `index.ts` - Types globaux
  - `api.ts` - Types API
  - `models.ts` - Types métier

---

## 🚀 Déploiement

### Backend (Railway)
- Pipeline CI/CD automatique via GitHub Actions
- Déploiement sur Railway avec Docker
- Gestion variables d'environnement

### Frontend (Vercel)
- Déploiement automatique à chaque push sur main
- Preview deployments pour les PRs
- Optimisations Next.js intégrées

---

## 📋 Checklist Initialisation

- [ ] Cloner et configurer le repository
- [ ] Configurer les variables d'environnement
- [ ] Initialiser les bases de données (PostgreSQL, Qdrant)
- [ ] Configurer GitHub OAuth
- [ ] Configurer OpenAI API
- [ ] Setuper les secrets GitHub Actions
- [ ] Déployer le backend sur Railway
- [ ] Déployer le frontend sur Vercel
- [ ] Tester les workflows CI/CD
