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
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Created At</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th></th>
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
                                <th>
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
                                            <div className="font-bold">Hart Hagerty</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>Purple</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                                <th>
                                    <button className="btn btn-ghost btn-xs">{book.Status}</button>
                                </th>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div >
    );
}
