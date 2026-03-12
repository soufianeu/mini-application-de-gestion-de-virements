# Mini application de gestion de virements

Application full-stack pour gerer des virements bancaires:

- Backend REST en `Spring Boot`
- Frontend en `Angular` + `Ng Zorro`
- Base de donnees `H2` (memoire)

## Fonctionnalites

### Backend

- Creer un virement
- Consulter la liste des virements
- Mettre a jour le statut d'un virement
- Validation des donnees d'entree

### Frontend

- Ecran d'initiation de virement (`/initiation`)
- Ecran de consultation des virements (`/virements`)
- Mise a jour du statut depuis la liste
- Redirection automatique vers `/virements` apres creation reussie
- Alertes de validation si champs obligatoires non renseignes

## Stack technique

- Java 21
- Spring Boot 3.3.x
- Spring Data JPA
- Spring Validation
- H2 Database
- Angular 20
- Ng Zorro 20
- Docker / Docker Compose

## Structure du projet

```text
.
|-- backend/
|   |-- src/
|   |-- pom.xml
|   |-- Dockerfile
|   `-- .dockerignore
|-- frontend/
|   |-- src/
|   |-- package.json
|   |-- Dockerfile
|   |-- nginx.conf
|   `-- .dockerignore
|-- docker-compose.yml
`-- README.md
```

## Prerequis

### Pour execution locale

- Java 21+
- Maven 3.9+
- Node.js 20+ (Node 22 OK)
- npm 10+

### Pour execution Docker

- Docker Desktop (ou Docker Engine + Compose)

## Demarrage rapide avec Docker (recommande)

Depuis la racine du projet:

```bash
docker compose up --build
```

Acces:

- Frontend: `http://localhost:4200`
- Backend API: `http://localhost:8080/api/virements`
- H2 Console: `http://localhost:8080/h2-console`

Arret:

```bash
docker compose down
```

Arret + suppression reseau/volumes anonymes:

```bash
docker compose down -v
```

## Execution locale (sans Docker)

### 1) Backend

```bash
cd backend
mvn spring-boot:run
```

Backend disponible sur:

- `http://localhost:8080`
- API: `http://localhost:8080/api/virements`
- H2 Console: `http://localhost:8080/h2-console`

### 2) Frontend

```bash
cd frontend
npm install
npm start
```

Frontend disponible sur:

- `http://localhost:4200`

## Connexion H2 Console

Dans l'ecran de login H2, utiliser exactement:

- Driver Class: `org.h2.Driver`
- JDBC URL: `jdbc:h2:mem:virementdb`
- User Name: `sa`
- Password: laisser vide

Important:

- Ne pas utiliser `jdbc:h2:~/test` (cause l'erreur `Database ... not found`).
- La base H2 est en memoire: les donnees sont perdues au redemarrage.
- En Docker, l'acces distant H2 est autorise via `spring.h2.console.settings.web-allow-others=true`.

## API REST

Base URL:

- `http://localhost:8080/api/virements`

### Creer un virement

`POST /api/virements`

Body exemple:

```json
{
  "sourceAccount": "MA6400112233445566778899",
  "destinationAccount": "MA5100554433221100998877",
  "amount": 1500.75,
  "currency": "MAD",
  "beneficiaryName": "Client X",
  "reason": "Paiement facture"
}
```

### Lister les virements

`GET /api/virements`

### Mettre a jour le statut

`PATCH /api/virements/{id}/status`

Body exemple:

```json
{
  "status": "VALIDATED"
}
```

Valeurs de statut supportees:
-En attente
-Validé
-Rejeté
-Exécuté

## Scripts utiles

### Backend

```bash
cd backend
mvn test
```

### Frontend

```bash
cd frontend
npm run build
```

## Depannage

### Port 4200 deja utilise

```powershell
Stop-Process -Id (Get-NetTCPConnection -LocalPort 4200 -State Listen).OwningProcess -Force
```

### Rebuild Docker apres changements

```bash
docker compose up -d --build
```
