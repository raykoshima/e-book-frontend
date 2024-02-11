import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Logform from '../layout/Logform'
import Regform from '../layout/regform'
import useAuth from '../Hooks/useAuth'
import Header from '../layout/Header'
import RentBook from '../layout/RentBook'
import Dashboard from '../layout/Dashboard'
import UserProfile from '../layout/UserProfile'
import RentBookAdmin from '../layout/AdminRentBook'

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header/>
            <Outlet />
        </>,
        children: [
            { index: true, element: <Logform /> },
            { path: '/register', element: <Regform /> }
        ]
    }
])

const userRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header/>
            <Outlet />
        </>,
        children: [
            { index: true, element: <Dashboard/> },
            { path: '/rentbook', element: <RentBook/> },
            { path: '/profile', element: <UserProfile/> },
            { path: '/rentBookAdmin', element: <RentBookAdmin/> },
        ]
    }
])


export default function AppRouter() {
    const {user} = useAuth()
    const finalRouter = user?.id ? userRouter : guestRouter
    return (
        <RouterProvider router={finalRouter} />
    )
}
