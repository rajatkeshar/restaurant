import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuthInfo } from "../auth/AuthWrapper";

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState()
    const [ errorMessage, setErrorMessage ] = useState(null)
    const {login} = useAuthInfo();

    const HandleLogin = async () => {
        try {
            await login(username, password);
            navigate('/profile')
        } catch (error) {
            setErrorMessage(error);
        }
    }

    return (
        <div>
            <section className="menu section">
                <div className="title">
                    <h2>login</h2>
                    <div className="underline"></div>
                </div>
                
            </section>
            <div>
                <img src="https://raw.githubusercontent.com/john-smilga/react-projects/master/05-menu/setup/public/images/item-8.jpeg" alt="american classic"></img>
                <form className="login">
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <button onClick={() => HandleLogin()}>Login</button>
                </form>
            </div>
            {errorMessage ? <div className="error">{errorMessage}</div> : null }
        </div>
    )
}

export default Login;