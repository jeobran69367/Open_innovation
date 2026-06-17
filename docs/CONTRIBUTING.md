# Contributing Guide

## 📋 Avant de commencer

- Fork le repository
- Cloner votre fork: `git clone <your-fork-url>`
- Créer une branche de feature: `git checkout -b feature/your-feature`

## 🛠️ Setup local développement

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # ou `venv\Scripts\activate` sur Windows
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

### Docker (Recommandé)

```bash
docker-compose up -d
```

## 🧪 Testing

### Backend

```bash
pytest backend/tests
pytest backend/tests --cov=backend/app
```

### Frontend

```bash
cd frontend
npm test
```

## 📝 Code Style

### Backend

```bash
# Format with black
black backend/app

# Lint with flake8
flake8 backend/app

# Type check with mypy
mypy backend/app
```

### Frontend

```bash
# Format with prettier
npm run format

# Lint with ESLint
npm run lint
```

## 🚀 Git Workflow

1. Créer une branche pour votre feature
2. Commiter vos changements avec des messages clairs
3. Push vers votre fork
4. Créer une Pull Request vers `main` ou `develop`

### Format des commits

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Exemple:
```
feat(search): add semantic search with RAG

Implement retrieval-augmented generation pipeline
using LangChain and Qdrant for semantic search.

Closes #123
```

## ✅ Checklist PR

- [ ] Code formaté
- [ ] Tests écrits et passants
- [ ] Documentation mise à jour
- [ ] Pas de breaking changes (ou documentés)
- [ ] Messages de commit clairs

## 📚 Resources

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [LangChain Docs](https://python.langchain.com/)
- [SQLAlchemy Docs](https://docs.sqlalchemy.org/)

## 🐛 Reporting Issues

Utiliser les templates GitHub Issues:
- Bug Report
- Feature Request
- Documentation

---

Merci pour vos contributions! 🙏
