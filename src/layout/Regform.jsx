import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { Link, redirect } from 'react-router-dom'
import Swal from 'sweetalert2';

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
            if (!validateForm()) return;

            const rs = await axios.post('http://localhost:3000/auth/register', input);
            console.log(rs);
            if (rs.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: 'คุณลงทะเบียนสำเร็จแล้ว!'
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
            <div className='flex text-3xl font-bold pt-20 justify-center bg-gray-800 text-white'>
                <h1>สมัครสมาชิก</h1>
            </div>
            <div className='flex flex-col lg:flex-row gap-2 justify-center bg-gray-800 p-10'>
                <div className='rounded-md p-10 bg-white'>
                    <form onSubmit={hdlSubmit} className='flex justify-center'>
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
                <div className='rounded-md p-10 bg-white'>
                    <p className='font-bold'>นโยบาย เงื่อนไข ข้อตกลง สิทธิส่วนบุคคลสำหรับสมาชิก</p>
                    <p className='font-bold'>1. ข้อมูลส่วนบุคคล</p>
                    <p>1.1 สมาชิกทุกท่านจะต้องระบุข้อมูลส่วนบุคคลที่เป็นความจริง การกระทำการใดๆ จะต้องไม่ขัดต่อพระราชบัญญัติความผิดคอมพิวเตอร์ ปี 2550 ทุกประการ หากฝ่าฝืน ผู้ให้บริการ จะขอสงวนสิทธ์ในการให้ใช้บริการ</p>
                    <p>1.2 ผู้ให้บริการ จะเก็บข้อมูลส่วนตัวของท่าน เพื่อการนำเสนอเนื้อหาและบริการ ให้ตรงกับความต้องการและ ความสนใจของคุณ เป็นหลัก</p>

                    <p className='font-bold'>2. การใช้ข้อมูลสมาชิก</p>
                    <p>ผู้ให้บริการ เปิดให้บริการฟรี แต่ข้อมูลของสมาชิก จะไม่มีการเปิดเผยไปยังกลุ่มบุคคลที่ 3 แต่ประการใด</p>

                    <p className='font-bold'>3. การเปิดเผยข้อมูลต่อสาธารณะ</p>
                    <p>ผู้ให้บริการ จะไม่เปิดเผยข้อมูลส่วนบุคคลของสมาชิก ยกเว้นในกรณีต่อไปนี้</p>
                    <p>3.1 ผู้ให้บริการ จะเปิดเผยข้อมูลส่วนบุคคลของท่านสมาชิก ที่ท่านได้ระบุมาในข้อมูลส่วนตัว ให้กับแผนกวิชาชีพของท่าน หรือวิทยาลัยเทคนิคสัตหีบ ตามที่ ผู้ให้บริการ เห็นสมควร</p>
                    <p>3.2 ผู้ให้บริการ มีสิทธิ์ในการเปิดเผยข้อมูลใด ๆ หากข้อมูลนั้น เป็นที่ต้องการในทางกฎหมาย โดยการเปิดเผยนั้นมีความจำเป็นต่อ - กระบวนการทางกฎหมาย - การทำตามเงื่อนไขการให้บริการ - การอ้าง – หรือเรียกร้องว่าเนื้อหานั้น ๆ ละเมิดสิทธิของผู้อื่น - การรักษาสิทธิ์ และความปลอดภัยส่วนบุคคล ของผู้ใช้บริการของเว็บไซต์ ผู้ให้บริการ</p>
                    <p>3.3 ในกรณีที่สมาชิกละเมิด ฝ่าฝืน และไม่ปฎิบัติตามเงื่อนไขการให้บริการ</p>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row gap-2 justify-center bg-gray-800 p-10'></div>
        </>
    )
}