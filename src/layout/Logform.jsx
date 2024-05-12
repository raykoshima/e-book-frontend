import React, { useState } from 'react'
import axios from 'axios'
import useAuth from '../Hooks/useAuth'
import { Link, redirect } from 'react-router-dom'
import Swal from 'sweetalert2';
import Footer from "./footer";

export default function Logform() {
    const { setUser } = useAuth()
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const [error, setError] = useState('');
    const validateForm = () => {
        if (!input.email.trim() || !input.password.trim()) {
            setError('โปรดกรอกชื่อผู้ใช้และรหัสผ่าน');
            return false;
        }
        setError('');
        return true;
    };

    const hdlSubmit = async e => {
        try {
            e.preventDefault();
            if (!validateForm()) return;

            const rs = await axios.post("http://localhost:3001/auth/login", input);
            localStorage.setItem("token", rs.data.token);

            const localtoken = localStorage.getItem("token");
            const rs1 = await axios.get("http://localhost:3001/auth/me", {
                headers: { Authorization: `Bearer ${localtoken}` }
            });
            delete rs1.data.Password;
            setUser(rs1.data);
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: 'คุณเข้าสู่ระบบสำเร็จแล้ว!',
            }).then(()=> {
                if(rs1.data.Backend === import.meta.env.VITE_ROLE){
                    console.log('role 99 success')
                    window.location = "/rentBookAdmin"
                }else{
                    window.location = "/"
                }});
                
        } catch (err) {
            // console.log(err.message);
            if(err.message === 'Request failed with status code 404'){
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'รหัสหรือชื่อผู้ใช้ไม่ถูกต้อง'
                });  
            }else{
               Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'เกิดข้อผิดพลาดขณะเข้าสู่ระบบ โปรดลองอีกครั้งในภายหลัง'
            }); 
            }
            
        }
    };

    return (
        <>
        <title>เข้าสู่ระบบ</title>
            {/* <div className='flex text-3xl font-bold pt-20 justify-center bg-gray-800 text-white'>
                <h1>เข้าสู่ระบบ</h1>
            </div> */}
            {/* <div className='overflow-hidden h-full max-h-screen bg-zinc-800'> */}
                <div className='flex flex-col lg:flex-row flex h-fit justify-center p-10'>
                    <div className="container mx-auto mt-20">
                        <form onSubmit={hdlSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-2xl mb-6 text-center font-semibold">Sign In</h2>
                            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Email</label>
                                <input type="email" id="email" name="email" value={input.email} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                                <input type="password" id="password" name="password" value={input.password} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type="submit" onChange={hdlSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">Sign In</button>
                            <p>ยังไม่มีบัญชี? <Link to="/register" className='text-sky-500'>สมัครเลย</Link></p>
                        </form>
                    </div>
                </div>
                <Footer />
            {/* </div> */}
            {/* <div className='flex flex-col lg:flex-row gap-2 justify-center bg-gray-800 p-10'></div> */}
        </>
    )
}
