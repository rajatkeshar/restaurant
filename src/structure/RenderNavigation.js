import { Routes, Route } from 'react-router-dom'
import { useAuthInfo } from '../auth/AuthWrapper'
import { navigations } from './Navigation';

export const RenderNavigation = () => {
    const {user} = useAuthInfo();

    return (
        <Routes>
            { navigations.map((r, i) => {
                if(r.isPrivate && user.isAuthenticated) {
                    return <Route key={i} path={r.path} element={r.element} />
                } else if(!r.isPrivate) {
                    return <Route key={i} path={r.path} element={r.element} />
                } else return false
            })}
        </Routes>
    )
}

export const RenderMenu = () => {

}