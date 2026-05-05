import { useState } from "react";
import { createAccount, createHome, createRoom } from "../api/accountApi.js";

export default function Accounts() {
  const [message, setMessage] = useState("");
  const [account, setAccount] = useState({ username: "", email: "", password: "" });
  const [home, setHome] = useState({ accountId: "", name: "", address: "" });
  const [room, setRoom] = useState({ accountId: "", homeId: "", name: "" });

  async function submitAccount(event) {
    event.preventDefault();
    try {
      const data = await createAccount(account);
      setMessage(`Account created successfully${data?.accountId ? ` with ID ${data.accountId}` : ""}.`);
      setAccount({ username: "", email: "", password: "" });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to create account.");
    }
  }

  async function submitHome(event) {
    event.preventDefault();
    try {
      await createHome({ ...home, accountId: Number(home.accountId) });
      setMessage("Home created successfully.");
      setHome({ accountId: "", name: "", address: "" });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to create home.");
    }
  }

  async function submitRoom(event) {
    event.preventDefault();
    try {
      await createRoom(Number(room.accountId), Number(room.homeId), { name: room.name });
      setMessage("Room created successfully.");
      setRoom({ accountId: "", homeId: "", name: "" });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Failed to create room.");
    }
  }

  return (
    <section>
      <div className="page-header">
        <p className="eyebrow">Microservice 1</p>
        <h2>Accounts & Homes</h2>
        <p className="subtitle">Create accounts, homes, and rooms through the Account & Home microservice.</p>
      </div>

      {message && <p className="message">{message}</p>}

      <div className="forms-grid">
        <form className="form-card" onSubmit={submitAccount}>
          <h3>Create Account</h3>
          <label>Username<input value={account.username} onChange={(e) => setAccount({ ...account, username: e.target.value })} required /></label>
          <label>Email<input type="email" value={account.email} onChange={(e) => setAccount({ ...account, email: e.target.value })} required /></label>
          <label>Password<input type="password" value={account.password} onChange={(e) => setAccount({ ...account, password: e.target.value })} required /></label>
          <button type="submit">Create Account</button>
        </form>

        <form className="form-card" onSubmit={submitHome}>
          <h3>Create Home</h3>
          <label>Account ID<input value={home.accountId} onChange={(e) => setHome({ ...home, accountId: e.target.value })} required /></label>
          <label>Home Name<input value={home.name} onChange={(e) => setHome({ ...home, name: e.target.value })} required /></label>
          <label>Address<input value={home.address} onChange={(e) => setHome({ ...home, address: e.target.value })} /></label>
          <button type="submit">Create Home</button>
        </form>

        <form className="form-card" onSubmit={submitRoom}>
          <h3>Create Room</h3>
          <label>Account ID<input value={room.accountId} onChange={(e) => setRoom({ ...room, accountId: e.target.value })} required /></label>
          <label>Home ID<input value={room.homeId} onChange={(e) => setRoom({ ...room, homeId: e.target.value })} required /></label>
          <label>Room Name<input value={room.name} onChange={(e) => setRoom({ ...room, name: e.target.value })} required /></label>
          <button type="submit">Create Room</button>
        </form>
      </div>
    </section>
  );
}
