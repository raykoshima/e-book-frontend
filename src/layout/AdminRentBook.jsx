import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

export default function AdminRentBook() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.role !== 99) {
            Swal.fire({
                icon: 'error',
                title: 'Login role failed',
                text: 'หน้าเพจนี้เฉพาะเจ้าหน้าที่เท่านั้น',
                timer: 2000
            });
            navigate('/');
        }
    }, [user, navigate]);

    const [rentbook, setRentBook] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/rentbook/all", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRentBook(response.data);
            } catch (error) {
                console.error("Error fetching Rentbook:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="navbar bg-base-300 flex justify-end gap-2">
                <button className="btn btn-outline btn-success">เพิ่มรายการหนังสือ</button>
                <button className="btn btn-outline btn-error">ลบข้อมูล</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label className='flex items-center justify-center gap-1'>
                                    <input type="checkbox" className="checkbox" />
                                    <p>เลือกทั้งหมด</p>
                                </label>
                            </th>
                            <th>ไอดี</th>
                            <th>ชื่อหนังสือ</th>
                            <th>วันที่ยืม</th>
                            <th>ต้องส่งคืน</th>
                            <th>สถานะ</th>
                            <th>แก้ใข</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentbook.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <p className="text-center italic">ไม่มีข้อมูลในรายการ</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rentbook.map(book => (
                                <tr key={book.id}>
                                    <th className='flex justify-center'>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={book.img} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-center items-center font-bold">ID:{book.id}</div>
                                                <div className="flex justify-center items-center text-sm opacity-50"><i className="fa-solid fa-user"></i>{book.UserID}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='font-bold'>{book.Title}</td>
                                    <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                                    <td className='text-red-500'>{new Date(book.Duedate).toLocaleDateString()}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs text-green-500">{book.Status}</button>
                                    </th>

                                    <th>
                                        <button className="btn btn-outline btn-warning">Edit</button>
                                    </th>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div >
        </>
    );
}
