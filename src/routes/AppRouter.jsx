import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Logform from '../layout/Logform'
import Regform from '../layout/regform'
import useAuth from '../Hooks/useAuth'
import Header from '../layout/Header'
import Userhome from '../layout/Userhome'
import Dashboard from '../layout/Dashboard'
import UserProfile from '../layout/UserProfile'

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
            { path: '/new', element: <Userhome/> },
            { path: '/profile', element: <UserProfile/> },
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
