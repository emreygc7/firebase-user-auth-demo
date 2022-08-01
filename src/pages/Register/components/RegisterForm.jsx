import { useState, useContext } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../../config/auth/firebase'
import { useNavigate, Link } from 'react-router-dom'
import { firebaseContext } from '../../../context/FirebaseContext'
import toast, { Toaster } from 'react-hot-toast';

//style
import style from '../styles/register.module.css'

const RegisterForm = () => {
    const { setAuthToken, setUserMail, setUsername } = useContext(firebaseContext)

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => { 
        e.preventDefault()
        if(!email || !password || !confirmEmail || !confirmPassword || !displayName ){
            toast.error("Please fill in all the information completely.")
        }else if(email !== confirmEmail) {
            toast.error("Email addresses do not match.")
        }else if(password !== confirmPassword){
            toast.error("Passwords do not match.")
        }else if(password.length < 6){
            toast.error("Password cannot be less than 6 characters.")
        }else if(displayName.length < 4){
            toast.error("Username cannot be less than 4 characters.")
        }else{
                const { user } = await createUserWithEmailAndPassword(auth, email, password, displayName)
                const profile = await updateProfile(auth.currentUser, {displayName: displayName})
                setAuthToken(user.accessToken)
                setUserMail(user.email)
                setUsername(user.displayName)
                navigate("/")
        }

    }


  
    return (

    <div className={style.registerContainer}>
       
        <form onSubmit={handleSubmit}>
            <h1>Create an Account</h1>

            <label htmlFor="username">Username</label>
            <input type="text" id='username' placeholder='Username' onChange={e => setDisplayName(e.target.value)} />

            <label htmlFor="email">E-mail</label>
            <input type="email" id='email' placeholder='example@example.com' onChange={e => setEmail(e.target.value) }  /> 
            
            <label htmlFor="confirmEmail">Confirm Email</label>
            <input type="email" id='confirmEmail' placeholder='example@example.com' onChange={e => setConfirmEmail(e.target.value)} />
            
            <label htmlFor="password">Password</label>
            <input type="password" id='password' placeholder='**********' onChange={e => setPassword(e.target.value)} />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id='confirmPassword' placeholder='**********' onChange={e => setConfirmPassword(e.target.value)} />
            
            <button type='submit'>Create Account</button>
            <Link to={"/login"}>Already have an account?</Link>
        </form>

        <Toaster position='top-right'/>
    </div>


  )
}

export default RegisterForm