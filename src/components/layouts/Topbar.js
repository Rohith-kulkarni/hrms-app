const Topbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="w-full p-4 bg-gray-100 flex justify-end">
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Topbar;
