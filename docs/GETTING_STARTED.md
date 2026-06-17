# 🚀 Getting Started Guide

Bienvenue sur **Open Innovation** ! Ce guide vous aidera à démarrer rapidement le développement.

## 📋 Prérequis

- **Docker & Docker Compose** (recommandé)
- **Node.js 18+** (pour le frontend local)
- **Python 3.12+** (pour le backend local)
- **Git**

## ⚡ Quick Start avec Docker (Recommandé)

### 1. Cloner le repository

```bash
git clone https://github.com/yourusername/open-innovation.git
cd open-innovation
```

### 2. Configurer les variables d'environnement

```bash
# Copier les fichiers de configuration
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Éditer les fichiers .env avec vos clés API
# (ne pas commiter les vrais secrets!)
```

### 3. Démarrer les services

```bash
# Démarrer tous les services (PostgreSQL, Redis, Qdrant, API, Workers)
docker-compose up -d

# Vérifier que tous les services sont en cours d'exécution
docker-compose ps
```

### 4. Initialiser la base de données

```bash
# Appliquer les migrations (si utilisant Alembic)
docker-compose exec backend alembic upgrade head

# (Optionnel) Charger les données de test
docker-compose exec backend python -m app.scripts.seed_data
```

### 5. Accéder à l'application

```
Frontend:  http://localhost:3000
API Docs:  http://localhost:8000/docs
PgAdmin:   http://localhost:5050  (optionnel)
```

---

## 🏃 Setup Local (Sans Docker)

### Backend

```bash
cd backend

# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement
source venv/bin/activate  # macOS/Linux
# ou
venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt

# Configurer les variables d'environnement
cp .env.example .env
# Éditer le fichier .env

# Démarrer le serveur
uvicorn app.main:app --reload
```

**L'API sera disponible à**: `http://localhost:8000`

### Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer le fichier .env.local

# Démarrer le serveur de développement
npm run dev
```

**L'app sera disponible à**: `http://localhost:3000`

### Services auxiliaires (requéreurs pour le backend)

Vous devez aussi lancer localement:
- **PostgreSQL 16**
- **Redis 7**
- **Qdrant 1.9**

Ou installer via Homebrew (macOS):
```bash
brew install postgresql redis
```

---

## 📚 Configuration des APIs externes

### GitHub OAuth

1. Aller sur https://github.com/settings/developers
2. Créer une nouvelle "OAuth App"
3. Remplir:
   - **Application name**: Open Innovation Dev
   - **Homepage URL**: http://localhost:3000
   - **Authorization callback URL**: http://localhost:8000/api/v1/auth/github/callback
4. Copier `Client ID` et `Client Secret` dans votre `.env`

### OpenAI API

1. Créer un compte sur https://platform.openai.com
2. Générer une clé API
3. Ajouter à votre `.env` en tant que `OPENAI_API_KEY`

---

## 🧪 Vérifier votre setup

### Backend - Health Check

```bash
curl http://localhost:8000/health
```

Réponse attendue:
```json
{
  "status": "healthy",
  "version": "v1"
}
```

### Frontend - Build

```bash
cd frontend
npm run build  # Devrait réussir sans erreurs
```

### API Documentation

Ouvrir: http://localhost:8000/docs

Vous devriez voir la documentation interactive Swagger de tous les endpoints.

---

## 🛠️ Commandes utiles

### Docker Compose

```bash
# Démarrer les services
docker-compose up -d

# Arrêter les services
docker-compose down

# Voir les logs
docker-compose logs -f [service]  # Ex: docker-compose logs -f backend

# Exécuter une commande dans un service
docker-compose exec backend python -c "..."

# Reconstruire les images
docker-compose build
```

### Backend (Celery)

```bash
# Démarrer le worker Celery
celery -A app.celery_app worker --loglevel=info

# Démarrer le scheduler (Beat)
celery -A app.celery_app beat --loglevel=info

# Monitorer les tâches (optionnel)
celery -A app.celery_app events
```

### Frontend

```bash
# Format code
npm run format

# Lint code
npm run lint

# Type check
npm run type-check

# Tests
npm test

# Build for production
npm run build
npm start
```

### Database

```bash
# Créer une migration (backend Alembic)
docker-compose exec backend alembic revision --autogenerate -m "Your migration message"

# Migrer
docker-compose exec backend alembic upgrade head

# Rollback
docker-compose exec backend alembic downgrade -1
```

---

## 🐛 Troubleshooting

### Erreur: Port déjà utilisé

```bash
# Trouver le processus sur le port
lsof -i :8000  # ou :3000, :5432, etc.

# Terminer le processus
kill -9 <PID>

# Ou changer le port dans docker-compose.yml
```

### Erreur: Connexion PostgreSQL refusée

```bash
# Vérifier que le conteneur PostgreSQL est en cours d'exécution
docker-compose ps postgres

# Vérifier les logs
docker-compose logs postgres

# Vérifier les variables d'environnement
echo $DATABASE_URL
```

### Erreur: Redis connexion refusée

```bash
# Vérifier Redis
docker-compose exec redis redis-cli ping
# Devrait afficher: PONG

# Redémarrer Redis
docker-compose restart redis
```

### Frontend ne peut pas se connecter à l'API

- Vérifier que `NEXT_PUBLIC_API_URL` est correctement défini dans `.env.local`
- Vérifier que le backend est en cours d'exécution
- Vérifier les logs du frontend: `docker-compose logs frontend`
- Vérifier la configuration CORS dans `backend/app/core/config.py`

---

## 📖 Prochaines étapes

1. **Lire la documentation** - [Architecture](./ARCHITECTURE.md), [Structure du projet](./PROJECT_STRUCTURE.md)
2. **Contribuer** - Voir [CONTRIBUTING.md](./CONTRIBUTING.md)
3. **Explorer le code** - Les principaux fichiers sont bien commentés
4. **Rejoindre la communauté** - Créer des discussions/issues

---

## 🆘 Need Help?

- 📖 Lire la [documentation complète](./README.md)
- 🐛 Créer une issue sur GitHub
- 💬 Commencer une discussion

**Bon développement!** 🚀
