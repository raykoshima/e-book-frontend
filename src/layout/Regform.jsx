import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link, redirect } from 'react-router-dom'
import Swal from 'sweetalert2';
import Footer from "./footer";

export default function Regform() {
    const [input, setInput] = useState({
        password: '',
        confirmPassword: '',
        email: '',
        displayname: ''
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const [error, setError] = useState('');
    const validateForm = () => {
        if (!input.email.trim() || !input.password.trim() || !input.confirmPassword.trim()) {
            setError('โปรดกรอกชื่อผู้ใช้, รหัสผ่าน, และยืนยันรหัสผ่าน');
            return false;
        }
        if (input.password !== input.confirmPassword) {
            setError('รหัสผ่านไม่ตรงกัน');
            return false;
        }
        setError('');
        return true;
    };

    const hdlSubmit = async e => {
        try {
            e.preventDefault();
            if (!validateForm()) return;

            const rs = await axios.post('http://localhost:3000/auth/register', input);
            console.log(rs);
            if (rs.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'คุณลงทะเบียนสำเร็จแล้ว!',
                    timer: 1500
                }).then(() => {
                    window.location.href = '/';
                });
            }
        } catch (err) {
            console.log(err.message);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: 'เกิดข้อผิดพลาดระหว่างการลงทะเบียน กรุณาลองใหม่อีกครั้งในภายหลัง.'
            });
        }
    };

    return (
        <>
        <title>สมัครสมาชิก</title>
        <div className='flex flex-col lg:flex-row flex h-fit justify-center p-10'>
                    <div className="container mx-auto mt-20">
                        <form onSubmit={hdlSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-2xl mb-6 text-center font-semibold">Sign Up</h2>
                            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                                <input type="email" id="email" name="email" value={input.email} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="displayname" className="block text-gray-700 font-medium mb-2">Display name</label>
                                <input type="text" id="displayname" name="displayname" value={input.displayname} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                                <input type="password" id="password" name="password" value={input.password} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" value={input.confirmPassword} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type="submit" onChange={hdlSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">Sign Up</button>
                            <p>มีบัญชีอยู่แล้ว? <Link to="/login" className='text-sky-500'>เข้าสู่ระบบ</Link></p>
                        </form>
                    </div>
                </div>
                <Footer />
            {/* <div className='flex flex-col lg:flex-row gap-2 justify-center bg-gray-800 p-10'></div> */}
        </>
    )
}