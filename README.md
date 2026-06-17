# 🔍 Open Innovation - Plateforme de Découverte d'Open Source

Une plateforme intelligente de curation et de découverte de logiciels open source utilisant l'IA et le RAG pour identifier les projets les plus pertinents et matures.

## 📋 Table des matières

- [Caractéristiques](#caractéristiques)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Démarrage rapide](#démarrage-rapide)
- [Documentation](#documentation)
- [Contribution](#contribution)

## ⭐ Caractéristiques

✅ **Découverte Intelligente** - Exploration automatisée de GitHub via API
✅ **Analyse IA** - Évaluation de la maturité et de la qualité des projets
✅ **Système RAG** - Moteur de recherche sémantique avancé
✅ **Catalogue Structuré** - Classification intelligente par domaine et usage
✅ **Authentification OAuth** - Connexion via GitHub
✅ **Communauté** - Commentaires, votes et recommandations
✅ **Tableaux de Bord** - Personnalisés pour utilisateurs et mainteneurs

## 🛠️ Tech Stack

### ⚙️ Backend
- **Python 3.12** + **FastAPI 0.110**
- **SQLAlchemy 2.0** pour l'ORM
- **PostgreSQL 16** - Base de données relationnelle
- **Redis 7** - Cache et sessions
- **Celery 5.3** - Files d'attente asynchrones

### 🤖 IA / RAG
- **LangChain 0.2** - Framework pour applications LLM
- **OpenAI GPT-4o** - Modèle de langue
- **sentence-transformers** - Embeddings sémantiques
- **Qdrant 1.9** - Base de données vectorielle
- **PyGitHub 2.3** - API GitHub Python

### 🎨 Frontend
- **Next.js 14** - Framework React moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **ShadCN/UI** - Composants React réutilisables
- **GitHub OAuth 2.0** - Authentification

### 🚀 DevOps
- **Docker Compose** - Orchestration locale
- **GitHub Actions** - CI/CD
- **Railway** - Déploiement API
- **Vercel** - Déploiement Frontend

## 🏗️ Architecture

```
Open_inovation/
├── backend/                    # API FastAPI + services IA/RAG
│   ├── app/
│   │   ├── api/               # Endpoints API
│   │   ├── models/            # Modèles ORM SQLAlchemy
│   │   ├── schemas/           # Schémas Pydantic
│   │   ├── services/          # Logique métier
│   │   │   ├── ai/           # Services IA
│   │   │   ├── github/       # Intégration GitHub
│   │   │   └── rag/          # Système RAG
│   │   ├── tasks/            # Tasks Celery
│   │   ├── db/               # Configuration base de données
│   │   └── core/             # Configuration générale
│   ├── tests/                # Tests unitaires et intégration
│   └── requirements.txt       # Dépendances Python
│
├── frontend/                  # Application Next.js
│   ├── src/
│   │   ├── app/              # Pages et routes
│   │   ├── components/       # Composants réutilisables
│   │   ├── lib/              # Utilitaires
│   │   ├── hooks/            # React hooks personnalisés
│   │   ├── services/         # Appels API
│   │   ├── types/            # Types TypeScript
│   │   └── styles/           # Styles globaux
│   └── package.json          # Dépendances Node.js
│
├── devops/
│   ├── docker/               # Dockerfiles
│   └── kubernetes/           # Manifests K8s (optionnel)
│
├── .github/
│   └── workflows/            # GitHub Actions
│
└── docs/                      # Documentation projet
```

## 🚀 Démarrage rapide

### Prérequis

- Docker & Docker Compose
- Node.js 18+
- Python 3.12+
- PostgreSQL 16 (ou via Docker)

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/yourusername/open-innovation.git
cd open-innovation
```

2. **Variables d'environnement**
```bash
cp .env.example .env
# Éditer .env avec vos configuration
```

3. **Démarrer les services avec Docker Compose**
```bash
docker-compose up -d
```

4. **Initialiser la base de données**
```bash
docker-compose exec backend python -m alembic upgrade head
```

5. **Démarrer l'application frontend**
```bash
cd frontend
npm install
npm run dev
```

L'application est accessible à `http://localhost:3000`

## 📚 Documentation

Pour plus de détails, consultez:
- [Documentation Backend](./docs/BACKEND.md)
- [Documentation Frontend](./docs/FRONTEND.md)
- [Guide d'Architecture](./docs/ARCHITECTURE.md)
- [Guide de Contribution](./docs/CONTRIBUTING.md)

## 📝 Roadmap

- [ ] v0.1 - MVP avec recherche de base
- [ ] v0.2 - Système RAG complet
- [ ] v0.3 - Tableau de bord utilisateur
- [ ] v1.0 - Lancement public
- [ ] v1.1 - Application mobile

## 🤝 Contribution

Les contributions sont bienvenues! Consultez [CONTRIBUTING.md](./docs/CONTRIBUTING.md) pour les directives.

## 📄 License

Ce projet est sous license MIT - voir le fichier [LICENSE](./LICENSE) pour plus de détails.

## 👥 Équipe

- **Product Owner** - Vision et stratégie
- **Tech Lead** - Architecture technique
- **Data/AI Engineers** - Système RAG et IA
- **Développeurs** - Frontend et Backend
- **DevOps** - Infrastructure et déploiement

---

**Dernière mise à jour**: juin 2026
