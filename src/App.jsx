import { Routes, Route, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import Home from "./Home";
import Menu from "./Menu";
import Noodles from "./Noodles";
import Tea from "./Tea";
import NoodleDetail from "./NoodleDetail";
import Cart from "./Cart";
import Kitchen from "./Kitchen";
import Checkout from "./Checkout";
import TeaDetail from "./TeaDetail";
import Stats from "./Stats";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import History from "./History";
import AdminDashboard from "./AdminDashboard";
import Register from "./Register";
import AdminMenu from "./AdminMenu";
import AdminStats from "./AdminStats";



export default function App() {
  const [params] = useSearchParams();

  useEffect(() => {
    const table = params.get("table");
    if (table) {
      localStorage.setItem("tableNumber", table);
      localStorage.removeItem("cart");
    }
  }, [params]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/noodles" element={<Noodles />} />
      <Route path="/tea" element={<Tea />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/kitchen" element={<ProtectedRoute><Kitchen /></ProtectedRoute>} />
       <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/history" element={<History />} />
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}/>
      <Route path="/register" element={<ProtectedRoute role="admin"><Register/></ProtectedRoute>}/>
      <Route path="/admin/menu" element={<ProtectedRoute role="admin"><AdminMenu/></ProtectedRoute>}/>
      <Route path="/noodles/:slug" element={<NoodleDetail/>}/>
      <Route path="/tea/:slug" element={<TeaDetail />} />
      <Route path="/admin/stats"element={<AdminStats/>}/>
    
    </Routes>
  );
}
