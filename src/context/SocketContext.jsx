import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import { toast } from "react-toastify";
import useOrderStore from "store/orderStore";

const socket = io("http://localhost:3001"); // Conexión única

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [ignoreNotifications, setIgnoreNotifications] = useState(false);
    const {fetchKitchen} = useOrderStore();

    useEffect(() => {
        console.log("🔗 Conectado a WebSocket...");
 
        // 🔹 Escuchar múltiples eventos
        socket.on("ordersUpdated", (data) => {
            if (ignoreNotifications) return;
            fetchKitchen()
            toast.info(`Nuevo pedido!`, { position: "top-right" });
        });

    /*     socket.on("orderCompleted", (data) => {
            toast.success(`¡Pedido ${data.orderId} listo para entrega!`);
        });

        socket.on("tableUpdated", (data) => {
            toast.info(`La mesa ${data.tableId} ha sido actualizada.`);
        });
 */
        return () => {
            socket.off("ordersUpdated");
          /*   socket.off("orderCompleted");
            socket.off("tableUpdated"); */
        };
    }, [ignoreNotifications]);

    return (
        <SocketContext.Provider value={{socket,setIgnoreNotifications }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
