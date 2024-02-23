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
        <div className="flex-centered">
            <h3>Sign in with google to continue</h3>
            <button onClick={signInWithGoogle} className="primary-btn">Sign in</button>
        </div>
    )
}