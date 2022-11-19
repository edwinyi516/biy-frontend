import { Outlet, Navigate } from 'react-router-dom'

export default async function PrivateRoutes (props) {
    return (
        await props.currentUser ? <Outlet /> : <Navigate to="/login" />
    )
}