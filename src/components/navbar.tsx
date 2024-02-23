import { Link, useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth"

export const Navbar = () =>{

    const navigate = useNavigate()

    const [user] = useAuthState(auth)

    const noProfilePicture = 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'

    const logout = async () =>{
        
        await signOut(auth)
        navigate("/")


    }


    return(
        <div className="navbar-container">
            <div className="Links">
                    <Link to="/">Home</Link>
                    { !user ? <Link to="/Login">Login</Link> : 
                    <Link to="/Createpost">Post</Link>}
            </div>
          
                {user &&   
                <div className="user-section">
                 <h3>{user?.displayName}</h3>
                <img src={user?.photoURL || noProfilePicture} className="profile-pic"/>
                <button onClick={logout} className="primary-btn">Log out</button>
                </div>
                 }

        </div>
        
    )
}