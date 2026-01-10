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
      <Route path="/noodles/:id" element={<NoodleDetail />} />
      <Route path="/tea" element={<Tea />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/kitchen" element={<Kitchen />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/tea/:id" element={<TeaDetail />} />
      

    </Routes>
  );
}
