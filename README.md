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

2. **Set up API environment variables:**
   - Copy the example file and edit as needed:
     ```sh
     cp api/.env.example api/.env.development
     ```
   - Edit the `.env.development` file in the API root directory and fill in the values:
     ```
     COINGECKO_API_KEY=""

     SECRET_KEY_BASE="your_secret_key"

     RAILS_MASTER_KEY=""
     ```

3. **Start the containers:**
   ```sh
   docker compose -f docker/docker-compose.dev.yml up --build
   ```

4. **Set up the database (in a new terminal):**
   ```sh
   docker exec cpt-api bin/rails db:migrate
   ```

5. **Access the API:**
   - The Rails API will be available at [http://localhost:3000](http://localhost:3000)

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
