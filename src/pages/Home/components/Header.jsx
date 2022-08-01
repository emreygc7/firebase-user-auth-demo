import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { firebaseContext } from "../../../context/FirebaseContext";
import style from '../styles/home.module.css'

const Header = () => {
  
  const { authToken, setAuthToken, setUserMail, username, setUsername } = useContext(firebaseContext);

    const signOut = () => {
        setAuthToken(null)
        setUserMail(null)
        setUsername(null)
        localStorage.removeItem("userToken")
        localStorage.removeItem("userMail")
        localStorage.removeItem("username")
    }


  if (!authToken) {
    return (
      <header className={style.header}>
        <h1>Header</h1>
        <nav className={style.headerNavbar}>
          <ul className={style.headerList}>
            <li>
              <NavLink to="/login">Sign In</NavLink>
            </li>
            <li>
              <NavLink to="/register">Sign Up</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  } else {
    return (
      <header  className={style.header}>
        <h1>Header</h1>
        <div>
          <p>Welcome {username}!</p>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </header>
    );
  }
};

export default Header;
