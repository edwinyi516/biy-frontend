import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoutes (props) {
    return (
        (props.currentUser && props.isLoading === false) ? <Navigate to="/login" /> : <Outlet />
    )
}