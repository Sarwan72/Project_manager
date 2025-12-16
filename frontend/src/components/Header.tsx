import { getUser, logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-semibold">Task Manager</h1>
      <div className="flex gap-4 items-center">
        <span>Hello, {user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
