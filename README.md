# Cryptocurrency Portfolio Tracker

A full-stack application for managing cryptocurrency portfolios.

## Technologies Used

- **Backend:** Ruby on Rails, PostgreSQL, Redis
- **Frontend:** React, Vite
- **Containerization:** Docker, Docker Compose

## User Flows

### User Registration

![Signup](https://github.com/user-attachments/assets/eecf39c2-be02-4263-923a-4b802ba511e1)

### User Login

![Login](https://github.com/user-attachments/assets/5799a20d-d9a4-4c7d-9d1f-403e27a9582f)

### Wallet Login

![Wallet Login](https://github.com/user-attachments/assets/04b6be72-4383-4f7f-a5dd-456f06801e98)

### Edit User Prefered Currency

![Edit User Currency](https://github.com/user-attachments/assets/aa5decb7-636e-4287-a9d7-db0f984b42d8)

### Create Portfolio

![Portfolio Creation](https://github.com/user-attachments/assets/b22c5b69-ba39-477a-8afa-c4bfa45571b2)

### Add Trade to Portfolio

![Trade Creation](https://github.com/user-attachments/assets/c954df74-ccfb-40db-b0f3-f6d6351c32d0)

## Setup Instructions (Docker - Development Environment)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/halanm/Cryptocurrency-Portfolio-Tracker.git
   cd Cryptocurrency-Portfolio-Tracker
   ```

2. **Set up environment variables:**

   - Copy the example files and edit as needed:
     ```sh
     cp api/.env.example api/.env.development
     ```
     ```sh
     cp frontend/.env.example frontend/.env.development
     ```

3. **Start the containers:**

   ```sh
   docker compose -f docker/docker-compose.dev.yml up --build
   ```

4. **Set up the database (in a new terminal):**

   ```sh
   docker exec cpt-api bin/rails db:migrate
   ```

5. **Access the application:**

   - The Rails API will be available at [http://localhost:3000](http://localhost:3000)

   - The React frontend will be available at [http://localhost:5173](http://localhost:5173)

## API Routes

Postman collection available [here](https://www.postman.com/aerospace-administrator-44389575/workspace/cpt/collection/22480061-1bce668a-a7e7-4519-be50-6cb5fafbcb31?action=share&creator=22480061).

---

### Authentication

- `POST /auth/signup`  
  **Body:**

  ```json
  {
    "email": "email",
    "password": "password"
  }
  ```

  **Response:**

  ```json
  {
    "token": "token",
    "refresh_token": "refresh_token"
  }
  ```

- `POST /auth/login`  
  **Body:**

  ```json
  {
    "email": "email",
    "password": "password"
  }
  ```

  **Response:**

  ```json
  {
    "token": "token",
    "refresh_token": "refresh_token"
  }
  ```

- `POST /auth/refresh`  
  **Body:**
  ```json
  {
    "refresh_token": "refresh_token"
  }
  ```
  **Response:**
  ```json
  {
    "token": "token",
    "refresh_token": "refresh_token"
  }
  ```

### Users

- `GET /users/me`  
  **Headers:** `Authorization: Bearer <JWT>`  
  **Response:**

  ```json
  {
    "id": 1,
    "email": "email",
    "wallet_address": "wallet_address",
    "prefferred_currency": "prefferred_currency"
  }
  ```

- `PUT /users/{id}`  
  **Headers:** `Authorization: Bearer <JWT>`  
  **Body:**

  ```json
  {
    "prefferred_currency": "prefferred_currency"
  }
  ```

  **Response:**

  ```json
  {
    "id": 1,
    "email": "email",
    "wallet_address": "wallet_address",
    "prefferred_currency": "prefferred_currency"
  }
  ```

- `GET /users/me/portfolios`  
  **Headers:** `Authorization: Bearer <JWT>`  
  **Response:**

  ```json
  [
    {
      "id": 1,
      "name": "name"
    }
  ]
  ```

- `POST /users/me/portfolios`  
  **Headers:** `Authorization: Bearer <JWT>`  
  **Body:**
  ```json
  {
    "name": "name"
  }
  ```
  **Response:**
  ```json
  {
    "id": 1,
    "name": "name"
  }
  ```

### Portfolios

- `GET /portfolios/{id}/trades`  
  **Headers:** `Authorization: Bearer <JWT>`  
  **Response:**

  ```json
  [
    {
      "id": 1,
      "token_symbol": "token_symbol",
      "amount_invested": "amount_invested",
      "quantity": "quantity",
      "currency": "currency",
      "trade_type": "trade_type",
      "current_value": "current_value"
    }
  ]
  ```

- `POST /portfolios/{id}/trades`
  **Headers:** `Authorization: Bearer <JWT>`  
  **Body:**
  ```json
  {
    "token_symbol": "token_symbol",
    "amount_invested": "amount_invested",
    "trade_type": "trade_type"
  }
  ```
  **Response:**
  ```json
  {
    "id": 1,
    "token_symbol": "token_symbol",
    "amount_invested": "amount_invested",
    "quantity": "quantity",
    "currency": "currency",
    "trade_type": "trade_type"
  }
  ```

### Tokens

- `GET /tokens`  
  **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "name",
      "symbol": "symbol",
      "contract_address": "contract_address",
      "price": 1,
      "market_cap": 1,
      "change_percentage": 1
    }
  ]
  ```
