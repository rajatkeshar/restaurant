import { useAuthInfo } from "../auth/AuthWrapper";


const Profile = () => {
    const {user} = useAuthInfo();
    return (
        <div>{`welcome: ${user.name}!`}</div>
    )
}

export default Profile;