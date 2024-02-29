import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Logform from '../layout/Logform'
import Regform from '../layout/regform'
import useAuth from '../Hooks/useAuth'
import Header from '../layout/Header'
import RentBook from '../layout/test/RentBook'
import Dashboard from '../layout/admin/Dashboard'
import UserProfile from '../layout/test/UserProfile'
import RentBookAdmin from '../layout/admin/AdminRentBook'
import Insert from '../layout/insertRentbook'
import Edit from '../layout/admin/AdminRentBookEdit'
import NotFound from '../layout/NotFound'
import Showproduct from '../layout/showproduct'
import Product from '../layout/user/product'
import Topup from '../layout/user/topup'

const guestRouter = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header/>
            <Outlet />
        </>,
        children: [
            { index: true, element: <Showproduct /> },
            { path: '/product', element: <Showproduct />},
            { path: '/product/:id', element: <Product />},
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
            { path: `/product`, element: <Showproduct />},
            { path: '/product/:id', element: <Product />},
            { path: '/rentbook', element: <RentBook/> },
            { path: '/profile', element: <UserProfile/> },
            { path: '/rentBookAdmin', element: <RentBookAdmin/> },
            { path: '/insert', element: <Insert/> },
            { path: '/edit', element: <Edit/> },
            { path: '/topup', element: <Topup />},
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
