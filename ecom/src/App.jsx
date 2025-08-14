import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/home";
import Alllisting from "./components/pages/productlist";
import ProductDetail from "./components/pages/ProductDetails";
import AddProductForm from "./components/pages/AddProduct";
import EditProductForm from "./components/pages/EditProduct";
import Login from "./components/pages/loginpages";
import Signup from "./components/pages/signuppage";
import Logout from "./components/pages/logoutpage";
import AdminDashboard from "./components/pages/AdminDashboard";
import Adminuser from "./components/pages/adminuser";
import AllProducts from "./components/pages/searchpage";
import Cartpage from "./components/pages/cart";
import BillSummary from "./components/pages/Payment";
import SuccessPage from "./components/pages/successpage";
import FailurePage from "./components/pages/failurepage";
import PaymentGateway from "./components/pages/PayementGateway";
import ResponsiveAppBar from "./components/pages/navbar";
import Profile from "./components/pages/Profile";




function App() {

  return (
    <BrowserRouter>
    <ResponsiveAppBar style={{ position: 'fixed', top: 0, zIndex: 1100}} />

    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/productlist" element={<Alllisting />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/add" element={<AddProductForm />} />
        <Route path="/product/update/:id" element={<EditProductForm />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/:reviewId" element={<ProductDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Adminuser />} />
        <Route path='/productsearch' element={<AllProducts/>}/>
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/checkout" element={<BillSummary />} />
        <Route path="/payment-success" element={<SuccessPage />} />
        <Route path="/payment-failed" element={<FailurePage />} />
        <Route path="/payment-gateway/:orderId" element={<PaymentGateway />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
