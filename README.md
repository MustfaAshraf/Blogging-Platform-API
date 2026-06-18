# Personal Blogging Platform API

A robust, secure, and scalable RESTful API for a personal blogging platform. This backend allows users to securely register, log in, and manage their blog posts using JWT authentication.

## 🌍 Live Demo & Deployment
*   **Live API Base URL:** `http://13.60.246.130:3000`
*   **Postman Collection:** A fully configured Postman Collection is included in the root of this repository (`Meta_Blog_Postman_Collection.json`) for easy API testing.
*   **Infrastructure:** The application is manually deployed on an **AWS EC2** instance, utilizing **PM2** for continuous process management and **MongoDB Atlas** for the cloud database.

## 🚀 Tech Stack
*   **Runtime:** Node.js
*   **Framework:** Express.js
*   **Database:** MongoDB Atlas & Mongoose
*   **Security:** bcrypt (Password Hashing), jsonwebtoken (JWT Auth)
*   **Validation:** Joi (Request body validation)
*   **Deployment:** AWS EC2, PM2

## 🗄️ Database Choice & Rationale
I chose **MongoDB (NoSQL)** with **Mongoose** for this project. 
*   **Why MongoDB?** Blog posts often have flexible schemas (e.g., adding tags, images, or comments later). MongoDB allows for rapid iteration and flexible document structures. 
*   **Relationships:** I implemented a strict One-to-Many relationship by storing the `author` (User's ObjectId) directly on the Post document using Mongoose `ref`.

## ⚙️ How to Set Up and Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MustfaAshraf/Blogging-Platform-API
   cd Blogging-Platform-API
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment Variables:**

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000

MONGO_URI=mongodb://localhost:27017/meta-blog

JWT_SECRET=your_super_secret_jwt_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key
```

4. **Run the application:**
   ```bash
   # For development (using nodemon if installed)
    npm run dev
    
    # For production
    npm start
   ```

## 📡 API Endpoints

### Authentication

- `POST /auth/register` — Register a new user (validates email and password).
- `POST /auth/login` — Authenticate a user and receive access and refresh tokens.

### Blog Posts

- `GET /posts` — **Public:** Retrieve all blog posts.
- `POST /posts` — **Protected:** Create a new post (linked to the authenticated user).
- `PUT /posts/:id` — **Protected:** Update a post *(only allowed if the user is the owner)*.
- `DELETE /posts/:id` — **Protected:** Delete a post *(only allowed if the user is the owner)*.

---

## 🛡️ Security & Architecture Features

- **Clean Code:** Organized into `Controllers`, `Models`, `Routes`, and `Middlewares`.

- **Validation Pipeline:** `Joi` middleware validates request payloads (such as email format, password length, and required fields) before requests reach the controllers, returning standard `400 Bad Request` responses.

- **Authorization Guard:** Custom JWT middleware protects private routes and injects the authenticated user into the request lifecycle.

- **Ownership Protection:** The API verifies ownership before allowing update or delete operations.

  ```js
  post.author.toString() === req.user._id.toString();
  ```

- **Global Error Handling:** Centralized middleware catches invalid endpoints (404) and unexpected server crashes (500), ensuring the API always returns formatted JSON.

## 🔮 Future Improvements

Currently, the system uses a single refresh token string per user. For a highly scalable production environment, I would refactor the User model to store an array of refresh tokens '[{ token, expiresAt }]' to support simultaneous multi-device logins. I would also implement a CI/CD pipeline via GitHub Actions to automate deployments to the AWS EC2 server.
