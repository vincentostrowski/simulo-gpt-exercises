import { useState } from "react";
import userService from "../services/userService";
import { auth } from "../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import Logo from "../assets/simulo.png";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = { username, password, email };
      await userService.create(body);
      await signInWithEmailAndPassword(auth, email, password);

      setUsername("");
      setPassword("");
      setEmail("");
    } catch (err) {
      console.error(err.message);
      alert(err.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="bg-sky-950 p-6 rounded-full shadow-md max-w-lg p-20"
        onSubmit={handleSubmit}
      >
        <img src={Logo} alt="logo" className="w-32 h-32 mx-auto mb-4" />
        <h2 className="mb-4 text-xl font-bold text-gray-500 text-center">
          Create Account
        </h2>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-full"
          placeholder="Email"
        />
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-full"
          placeholder="Username"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-full"
          placeholder="Password"
          minLength="6"
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/2 p-2 text-white bg-color1 rounded-full hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="flex justify-between mt-4 gap-9">
        <Link to="/login" className="text-blue-500 hover:underline">
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
