import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import Home from "./Home";
import Menu from "./Menu";
import Noodles from "./Noodles";
import Tea from "./Tea";
import NoodleDetail from "./NoodleDetail";
import Cart from "./Cart";
import Kitchen from "./Kitchen";

function App() {
  const [params] = useSearchParams();

  // 👉 อ่านเลขโต๊ะจาก QR (?table=1)
  useEffect(() => {
    const table = params.get("table");
    if (table) {
      localStorage.setItem("tableNumber", table);
    }
  }, [params]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Noodles" element={<Noodles />} />
      <Route path="/Noodles/:id" element={<NoodleDetail />} />
      <Route path="/Tea" element={<Tea />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Kitchen" element={<Kitchen />} />
    </Routes>
  );
}

export default App;
