import { auth, provider } from "../config/firebase"
import { signInWithPopup} from 'firebase/auth'
import { useNavigate } from "react-router-dom";

export const Login = () => {
    
    const navigate = useNavigate()

    const signInWithGoogle = async () => {

        const result = await signInWithPopup(auth, provider)
        navigate("/");    
    
    };

    

    return(
        <div className="top-div make-column">
            <div><h3 className="display-2">Sign in with google to continue</h3></div>
            <div><button onClick={signInWithGoogle} className="login-btn" >Sign in</button></div>
        </div>
    )
}