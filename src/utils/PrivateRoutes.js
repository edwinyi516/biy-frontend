import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoutes () {
    return (
        userLoggedIn ? <Outlet /> : <Navigate to="/login" />
    )
}