import { createContext, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { fetchKitchen } from "store/orderSlice";
import { toast } from "react-toastify";

const socket = io("http://localhost:3001"); // Conexión única

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("🔗 Conectado a WebSocket...");
 
        // 🔹 Escuchar múltiples eventos
        socket.on("ordersUpdated", (data) => {
            dispatch(fetchKitchen());
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
    }, [dispatch]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
