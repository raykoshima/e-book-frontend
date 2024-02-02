import React, { useState } from 'react'
import axios from 'axios'

export default function Logform() {
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
        } catch (err) {
            console.log(err.message)
        }
        
    }

    return (
        <>
            <div className='flex text-3xl font-bold p-3  justify-center'>
                <h1>Login</h1>
            </div>
            <div className='flex border justify-center'>
                <form onSubmit={hdlSubmit}>
                    <label className="form-control w-full max-w-xs">
                        <div className="label pl-20">
                        </div>

                        <div className="join flex items-center">
                            <label className="btn join-item"><i className="fa-solid fa-user"></i></label>
                            <input className="input input-bordered join-item" placeholder="Username"
                                name="username"
                                value={input.username}
                                onChange={hdlChange} />
                        </div>

                        <div className="label">
                        </div>

                        <div className="join flex items-center">
                            <label className="btn join-item"><i className="fa-solid fa-lock"></i></label>
                            <input className="input input-bordered join-item" placeholder="Password" type="password"
                                name="password"
                                value={input.password}
                                onChange={hdlChange} />
                        </div>

                        <div className='label flex'>
                            <div className='flex gap-3'>
                                <a className="link link-hover">Don't have an account?</a>
                                <button className="btn" onChange={hdlSubmit}>Login</button>
                            </div>
                        </div>
                    </label>
                </form>
            </div>
        </>
    )
}
