import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./cartContext";
import { KitchenProvider } from "./kitchenContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <KitchenProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </KitchenProvider>
  </BrowserRouter>
);
