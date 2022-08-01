import React, { useContext, useState } from "react";
import { auth } from "../../../config/auth/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { firebaseContext } from "../../../context/FirebaseContext";
import toast, { Toaster } from 'react-hot-toast';
import style from "../styles/login.module.css";

const LoginForm = () => {

  const { setAuthToken, setUserMail, setUsername } =
    useContext(firebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    if(!email || !password){
      toast.error("Please fill in all the information completely.")
    }else{
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        setAuthToken(user.accessToken);
        setUserMail(user.email);
        setUsername(user.displayName);
      } catch (error) {
        toast.error(error.message)
      }
    }
  

  };

  return (
    <div className={style.loginContainer}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="**********"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        <Link to={"/register"}>You need an account? Create one!</Link>
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default LoginForm;
