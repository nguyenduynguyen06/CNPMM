import NewCategory from "../Componant/AdminCategory/NewCategory";
import NewProduct from "../Componant/AdminProduct/NewProduct";
import User from "../Componant/AdminUser/User";
import HomePage from "../Pages/HomePage/home";
import Profilepage from "../Pages/Profile/profilepage";
import CartList from "../Pages/cart/CartList";
import ProductDetailComponents from "../Pages/productsDetails/ProductDetailComponent";

export const routes = [
    {
        path:'/',
        page: HomePage,
    },
    {
        path:"/add-category",
        page: NewCategory
    },
    {
        path:"/add-products",
        page: NewProduct
    },
    {
        path:"/profile",
        page:Profilepage
    },
    {
        path: "/product/:name",
        page: ProductDetailComponents
    },
    {
        path: "/cart",
        page: CartList
    },
    {
        path:"/user",
        page: User
    }
]