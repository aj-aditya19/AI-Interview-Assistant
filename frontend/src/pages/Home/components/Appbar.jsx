function Appbar({ onLogout }) {
  return (
    <header className="home-appbar">
      <h1>AI Interview Assistant</h1>
      <button type="button" className="home-logout" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
}

export default Appbar;
