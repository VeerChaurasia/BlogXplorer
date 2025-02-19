import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to Our App</h1>
      <p className="text-gray-600 mb-4">Join us or log in to continue.</p>
      <div className="flex space-x-4">
        <button 
          onClick={() => navigate("/register")} 
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Register
        </button>
        <button 
          onClick={() => navigate("/login")} 
          className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;
