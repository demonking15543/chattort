// ChatRoom.js
import React, { useEffect, useState, useRef } from "react";

function ChatRoom({ roomName, username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages(prev => [...prev, data]);
    };

    socketRef.current.onclose = () => {
      console.error("WebSocket closed unexpectedly");
    };

    return () => socketRef.current.close();
  }, [roomName]);

  const sendMessage = () => {
    socketRef.current.send(JSON.stringify({
      message: input,
      user: username,
    }));
    setInput("");
  };

  return (
    <div>
      <h2>Room: {roomName}</h2>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.user}:</strong> {msg.message}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;
