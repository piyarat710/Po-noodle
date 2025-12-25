import { createContext, useContext, useState } from "react";

const KitchenContext = createContext();

export function KitchenProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const addOrder = (items) => {
    setOrders(prev => [
      ...prev,
      {
        id: Date.now(),
        items,
        time: new Date().toLocaleTimeString()
      }
    ]);
  };

  const removeOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <KitchenContext.Provider value={{ orders, addOrder, removeOrder }}>
      {children}
    </KitchenContext.Provider>
  );
}

export const useKitchen = () => useContext(KitchenContext);
