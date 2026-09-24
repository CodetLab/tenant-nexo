import { useState } from "react";
import { chat } from "./Conection";

export default function StrategiesPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    const data = await chat(message);
    setResponse(data.response ?? JSON.stringify(data));
    setMessage("");
  }

  return (
    <form onSubmit={handleSubmit}> 
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribí un mensaje..."
      />
      <button type="submit">Enviar</button>

      <p>{response}</p>
    </form>
  );
}
