# Cryptocurrency Portfolio Tracker

A full-stack application for managing cryptocurrency portfolios.

---

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

---

## API Routes

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
    },
  ]
  ```