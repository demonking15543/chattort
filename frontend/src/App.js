import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!connected) return;

    const socket = new WebSocket(`ws://localhost:8000/ws/chat/${room}/`);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setChatLog((prev) => [...prev, { ...data, time }]);
    };

    return () => socket.close();
  }, [connected, room]);

  const joinRoom = () => {
    if (room && username) {
      setConnected(true);
      setChatLog([]);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socketRef.current.send(JSON.stringify({ message, username }));
      setMessage("");
    }
  };

  const leaveRoom = () => {
    socketRef.current?.close();
    setConnected(false);
    setChatLog([]);
    setRoom("");
    setUsername("");
  };

  if (!connected) {
    return (
      <div className="login-screen">
        <h2>Join Chat Room</h2>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Room ID" value={room} onChange={(e) => setRoom(e.target.value)} />
        <button onClick={joinRoom}>Join</button>
      </div>
    );
  }

  return (
    <div className="chat-app">
      <div className="sidebar">
        <h2>Room: {room}</h2>
        <p>User: {username}</p>
        <button onClick={leaveRoom}>Leave</button>
      </div>

      <div className="chat-window">
        <div className="messages">
        {chatLog.map((msg, i) => (
  <div
    key={i}
    className={`message-wrapper ${msg.username === username ? "sender" : "receiver"}`}
  >
    <div className={`message-bubble ${msg.username === username ? "sender-bubble" : "receiver-bubble"}`}>
      <div className="message-meta">
        <span className="user">{msg.username}</span>
      </div>
      <div className="text">{msg.message}</div>
      <small className="time">{msg.time}</small>

    </div>
  </div>
))}

        </div>

        <div className="message-input">
          <input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
