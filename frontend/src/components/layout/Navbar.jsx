import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">Expense Tracker</h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-600">
          <FaUserCircle size={20} />
          <span>{userInfo?.name}</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-rose-500 text-white px-3 py-1 rounded-lg hover:bg-rose-600 transition"
        >
          <FaSignOutAlt size={14} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
