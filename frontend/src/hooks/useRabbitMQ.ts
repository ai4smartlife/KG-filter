import { useEffect, useState } from "react";
import { getSocket } from "../utils/socket";

type RabbitMQMessage = string; 

export default function useRabbitMQ(): [RabbitMQMessage[], () => void] {
  const [messages, setMessages] = useState<RabbitMQMessage[]>([]);

  useEffect(() => {
    const socket = getSocket();

    const handleMessage = (message: RabbitMQMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("notification", handleMessage);

    return () => {
      socket.off("notification", handleMessage); // Cleanup on unmount
    };
  }, []);

  const clearMessages = () => setMessages([]);

  return [messages, clearMessages];
}
