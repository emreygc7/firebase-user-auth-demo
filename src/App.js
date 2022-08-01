import { useContext } from 'react';
import { firebaseContext } from './context/FirebaseContext'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home/index'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
 
  const { authToken } = useContext(firebaseContext)


  if(!authToken){
    return (
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/register' element ={<Register />} />
        <Route path='/login' element ={<Login />} />
      </Routes>
    );
  }else {
    return(
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/register' element ={<Navigate to={"/"}/>} />
        <Route path='/login' element ={<Navigate to={"/"} />} />
    </Routes>
    )
  }

}

export default App;
