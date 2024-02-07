import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Regform() {
    const [input , setInput] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    })

    const hdlChange = e => {
        setInput( prv => ( {...prv,[e.target.name] : e.target.value }  ) )
    }

    const hdlSubmit = async e => {
        e.preventDefault()
        if(input.password != input.confirmPassword){
            return alert("pass บ่ ตรง กัน")
        }
        const rs = await axios.post('http://localhost:3000/auth/register',input)
        console.log(rs)
        if(rs.status === 200){
            alert(rs.data)
        }
    }

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
                            onChange={ hdlChange } />
                        </div>

                        <div className="label">
                        </div>

                        <div className="join flex items-center">
                            <label className="btn join-item"><i className="fa-solid fa-envelope"></i></label>
                            <input className="input input-bordered join-item" placeholder="อีเมล" 
                            name="email" 
                            value={input.email}
                            onChange={ hdlChange } />
                        </div>

                        <div className="label">
                        </div>

                        <div className="join flex items-center">
                            <label className="btn join-item"><i className="fa-solid fa-lock"></i></label>
                            <input className="input input-bordered join-item" placeholder="รหัสผ่าน" type="password"
                            name="password"
                            value={input.password}
                            onChange={ hdlChange } />
                        </div>

                        <div className="label">
                        </div>

                        <div className="join flex items-center">
                            <label className="btn join-item"><i className="fa-solid fa-unlock"></i></label>
                            <input className="input input-bordered join-item" placeholder="ยืนยันรหัสผ่าน" type="password"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={ hdlChange } />
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