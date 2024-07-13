import { Link } from "react-router-dom";
import { useAuthInfo } from "../auth/AuthWrapper";
import { navigations } from "./Navigation";

const Headers = () => {
    const {user, logout} = useAuthInfo();
    const HandleLogout = () => {
        logout();
    }
    const MenuItem = ({r}) => {
        return (
            <button><Link to={r.path}>{r.name}</Link></button>
        )
    }

    return (
        <header className="app-header">
            {navigations.map((r, i) => { 
                if(!r.isPrivate && r.isMenu) {
                    return <MenuItem key={i} r={r} />
                } else if(user.isAuthenticated && r.isMenu){
                    return <MenuItem key={i} r={r} />
                } else return false;
            })}
            {user.isAuthenticated? (<button><Link to='logout' key='logout' onClick={() => HandleLogout()}>Logout</Link></button>): (<button><Link to='login' key='login'>Login</Link></button>)}
        </header>
    )
}

export default Headers;