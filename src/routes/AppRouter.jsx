import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Logform from '../layout/Logform'
import Regform from '../layout/regform'
import useAuth from '../Hooks/useAuth'
import Header from '../layout/Header'
import RentBook from '../layout/RentBook'
import Dashboard from '../layout/admin/Dashboard'
import UserProfile from '../layout/UserProfile'
import RentBookAdmin from '../layout/admin/AdminRentBook'
import Insert from '../layout/insertRentbook'
import Edit from '../layout/admin/AdminRentBookEdit'
import NotFound from '../layout/NotFound'
import Showproduct from '../layout/showproduct'

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header/>
            <Outlet />
        </>,
        children: [
            { index: true, element: <Showproduct /> },
            { path: '/register', element: <Regform /> },
            { path: '/login', element: <Logform />},
            { path: "*" , element : <NotFound />}
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
            { index: true, element: <Showproduct /> },
            { path: '/rentbook', element: <RentBook/> },
            { path: '/profile', element: <UserProfile/> },
            { path: '/rentBookAdmin', element: <RentBookAdmin/> },
            { path: '/insert', element: <Insert/> },
            { path: '/edit', element: <Edit/> },
            { path: "*" , element : <NotFound />}
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
