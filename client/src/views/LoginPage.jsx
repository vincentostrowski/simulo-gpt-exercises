import { useState } from "react";
import { auth } from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import Logo from "../assets/simulo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("There is no user associated with this email.");
      } else if (error.code === "auth/wrong-password") {
        alert("The password is incorrect.");
      } else if (error.code === "auth/invalid-credential") {
        alert("Invalid credentials");
      } else {
        alert(error.code, error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="bg-sky-950 p-9 rounded-full shadow-md p-20 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          signInWithEmail(email, password);
        }}
      >
        <img src={Logo} alt="logo" className="w-32 h-32 mx-auto mb-4" />
        <h2 className="mb-4 text-xl font-bold text-gray-500 text-center">
          Login
        </h2>
        <div className="flex flex-col items-center w-96">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-5/6 p-2 mb-4 border border-gray-300 rounded-full"
            placeholder="Email address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-5/6 p-2 mb-4 border border-gray-300 rounded-full"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 p-2 text-white bg-color1 rounded-full hover:bg-blue-600 shadow-lg"
          >
            Login
          </button>
        </div>
      </form>
      <div className="flex justify-between mt-4 gap-9">
        <Link to="/signup" className="text-green-500 hover:underline">
          No account? Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
