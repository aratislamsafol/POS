import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const Dashboard = () => {
  const token = useAuthStore((state) => state.token);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout); 
  const navigate = useNavigate(); 
    console.log(token);
  const handleLogout = () => {
    logout();          
    navigate("/login"); 
  };

  return (
    <div>
      <h1>This is Dashboard</h1>

      {isLoggedIn ? (
        <>
          <p>✅ Logged in. Token: {token}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>❌ Not logged in</p>
      )}
    </div>
  );
};

export default Dashboard;
