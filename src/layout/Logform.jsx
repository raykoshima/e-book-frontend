import React, { useState } from 'react'
import axios from 'axios'
import useAuth from '../Hooks/useAuth'
import { Link } from 'react-router-dom'

export default function Logform() {
    const { setUser } = useAuth()
    const [input, setInput] = useState({
        username: '',
        password: ''
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async e => {
        try {
            e.preventDefault()
            const rs = await axios.post("http://localhost:3000/auth/login", input)
            console.log(rs.data.token)
            localStorage.setItem("token", rs.data.token)
            const localtoken = localStorage.getItem("token");
            const rs1 = await axios.get("http://localhost:3000/auth/me", {
                headers: { Authorization: `Bearer ${localtoken}` }
            })
            delete rs1.data.Password
            console.log(rs1.data)
            setUser(rs1.data)
        } catch (err) {
            console.log(err.message)
        }

    }

    return (
        <>
            <div className='flex text-3xl font-bold p-3 justify-center bg-gray-800 text-white'>
                <h1>เข้าสู่ระบบ</h1>
            </div>
            <div className='flex justify-center bg-gray-800'>
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
                                <label className="btn join-item"><i className="fa-solid fa-lock"></i></label>
                                <input className="input input-bordered join-item" placeholder="รหัสผ่าน" type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={hdlChange} />
                            </div>

                            <div className='label flex justify-center'>
                                <div className='flex gap-3'>
                                    <Link to="/register">คุณต้องการสมัครบัญชี</Link>
                                    <button className="btn" onChange={hdlSubmit}>เข้าสู่ระบบ</button>
                                </div>
                            </div>
                        </label>
                    </form>
                </div>
            </div>
        </>
    )
}
