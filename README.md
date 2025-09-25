# Book Review API

REST API for books & reviews using Node.js, Express, MongoDB, and JWT.

## Setup
1. Clone repo
2. `cd book-review-api`
3. `cp .env.example .env` & edit
4. `npm install`
5. Start MongoDB
6. `npm run dev`

## Endpoints
- POST /auth/signup
- POST /auth/login
- POST /books (auth)
- GET /books?page&limit&author&genre
- GET /books/:id (with average rating + paginated reviews)
- POST /books/:id/reviews (auth, one review per user/book)
- PUT /reviews/:id (auth)
- DELETE /reviews/:id (auth)
- GET /search?q=... or /books/search?q=...
