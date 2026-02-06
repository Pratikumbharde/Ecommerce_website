<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5bdefadf-da0d-4106-ac29-3f1128c71785" />

# E-commerce Web Application

A full-stack e-commerce platform built with React.js, Node.js, Express, and MongoDB. This application provides a complete online shopping experience with user authentication, product management, shopping cart functionality, and payment integration.

## Features

### User Features
- User registration and authentication (JWT)
- User profile management
- Product browsing and search functionality
- Shopping cart management
- Order placement and tracking
- Product reviews and ratings
- Secure payment processing

### Admin Features
- Product management (CRUD operations)
- User management
- Order management
- Dashboard with sales analytics

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Axios for API calls
- CSS for styling

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests

### Payment Integration
- Razorpay payment gateway

## Project Structure

```
ecom/
├── src/
│   ├── components/
│   │   └── pages/
│   │       ├── auth/ (Login, Signup, etc.)
│   │       ├── products/ (Product listing, details)
│   │       ├── cart/ (Shopping cart)
│   │       ├── profile/ (User profile)
│   │       └── admin/ (Admin dashboard)
│   ├── App.jsx
│   └── main.jsx
│
├── backend/
│   ├── models/ (Mongoose schemas)
│   ├── routes/ (API routes)
│   ├── middleware/ (Authentication, validation)
│   └── server.js
│
└── public/
    └── images/ (Static assets)
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd E-commerce/ecom
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server:
   ```bash
   # In the root directory
   npm run dev
   ```
   This will start both the frontend and backend servers concurrently.

## Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run server` - Starts the backend server
- `npm run dev` - Runs both frontend and backend concurrently

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d


### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


Contact

For any queries, please contact [Pratikumbharde141@gmail.com] or open an issue on the repository.

