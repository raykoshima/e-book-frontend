import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link, redirect } from 'react-router-dom'

export default function Regform() {
    const [input, setInput] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const [error, setError] = useState('');
    const validateForm = () => {
        if (!input.username.trim() || !input.password.trim() || !input.confirmPassword.trim()) {
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
            if (!validateForm()) return; // ตรวจสอบความถูกต้องของฟอร์มก่อนที่จะส่งคำขอ
    
            const rs = await axios.post('http://localhost:3000/auth/register', input);
            console.log(rs);
            if (rs.status === 200) {
                // alert(rs.data);
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            }
        } catch (err) {
            console.log(err.message);
        }
    };
    

    return (
        <>
            <div className='flex text-3xl font-bold p-3 justify-center bg-gray-800 text-white'>
                <h1>สมัครสมาชิก</h1>
            </div>
            <div className='flex gap-2 justify-center bg-gray-800'>
                <div className='rounded-md p-10 bg-white'>
                    <form onSubmit={hdlSubmit}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label pl-20">
                            </div>

                            <div className="join flex items-center">
                                <label className="btn join-item"><i className="fa-solid fa-user"></i></label>
                                <input className="input input-bordered join-item" placeholder="ชื่อผู้ใช้"
                                    name="username"
                                    value={input.username}
                                    onChange={hdlChange} />
                            </div>

                            <div className="label">
                            </div>

                            <div className="join flex items-center">
                                <label className="btn join-item"><i className="fa-solid fa-envelope"></i></label>
                                <input className="input input-bordered join-item" placeholder="อีเมล"
                                    name="email"
                                    value={input.email}
                                    onChange={hdlChange} />
                            </div>

                            <div className="label">
                            </div>

                            <div className="join flex items-center">
                                <label className="btn join-item"><i className="fa-solid fa-lock"></i></label>
                                <input className="input input-bordered join-item" placeholder="รหัสผ่าน" type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={hdlChange} />
                            </div>

                            <div className="label">
                            </div>

                            <div className="join flex items-center">
                                <label className="btn join-item"><i className="fa-solid fa-unlock"></i></label>
                                <input className="input input-bordered join-item" placeholder="ยืนยันรหัสผ่าน" type="password"
                                    name="confirmPassword"
                                    value={input.confirmPassword}
                                    onChange={hdlChange} />
                            </div>

                            <div className="join flex items-center">
                                {error && <div className="text-red-500">{error}</div>}
                            </div>

                            <div className='label flex justify-center'>
                                <div className='flex gap-3'>
                                    <Link to="/">คุณต้องการที่จะเข้าสู่ระบบ</Link>
                                    <button className="btn">สมัคร</button>
                                </div>
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        </>
    )
}