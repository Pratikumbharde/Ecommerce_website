<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/39a86c25-5f77-40f2-bd24-c71a81427976" /># 🛒 Full Stack E-Commerce Website (Shoes & Clothing)

A full-stack e-commerce web application built using the MERN stack, featuring secure authentication, product management, cart system, and order/payment workflow.

The platform allows users to browse products, manage carts, place orders, and securely complete payments while supporting role-based management and scalable deployment.

---

## 🚀 Features

### 👤 Authentication & Security
- JWT Authentication using HttpOnly cookies
- Secure login & registration
- Protected routes
- Role-based access control
- Product ownership restrictions

### 🛍 Product Management
- Create, update, delete products
- Product listing with details page
- Product images and descriptions
- Only product owner/admin can edit or delete

### 🛒 Cart & Orders
- Add/remove items from cart
- Quantity management
- Bill summary page
- Automatic order creation before payment
- Order history support

### 💳 Payment Flow
- Redirect to payment gateway:
/payment-gateway/:orderId

- Payment success & failure handling:
- `/payment-success`
- `/payment-failed`

### 📊 Future Enhancements
- Admin dashboard
- Analytics & reports
- Inventory management
- Wishlist
- Coupons & discounts

---

## 🧱 Tech Stack

### Frontend
- React.js
- Axios
- React Router
- Material UI / CSS
- State management (custom/local state)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cookie-based session handling

### Deployment
- Frontend & backend hosted separately
- Cloud database support

---

## 📂 Project Structure

ecommerce/
│
├── frontend/
│ ├── src/
│ └── components/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── middleware/
│
└── README.md


---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone <repo-url>
cd ecommerce
2. Backend Setup
cd backend
npm install
npm start
3. Frontend Setup
cd frontend
npm install
npm start
🔐 Environment Variables (Backend)
Create .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:3000
📌 Key Learning Outcomes
Secure JWT authentication

Role-based authorization

Full e-commerce workflow

REST API design

Frontend-backend integration

Payment workflow handling

📷 Screenshots (Optional)
<img width="1920" height="1080" alt="Screenshot (29)" src="https://github.com/user-attachments/assets/5eac9a8d-0a58-40e8-b3ac-421f02dbd061" />

👨‍💻 Author
Pratik Kumbharde

