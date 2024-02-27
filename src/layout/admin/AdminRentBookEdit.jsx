import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';

function AdminRentBookEdit() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [rentdata, setRentData] = useState({});

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

        const token = localStorage.getItem('token');
        const fetchBook = async () => {
            try {
                const response = await axios.get("http://localhost:3000/rentbook/edit?id=2", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setRentData(response.data);
            } catch (error) {
                console.error("Error fetching Book:", error);
            }
        };

        fetchBook();
    }, [user, navigate]);

    return (
        <div className="container mx-auto px-4 pb-10">
            <div className="md:flex md:justify-center">
                <div className="md:w-1/2">
                    <h3 className="text-lg font-semibold mb-4">แก้ใขข้อมูลรายการหนังสือ</h3>
                    <form className='space-y-4'>
                        <div className="space-y-1">
                            <label htmlFor="id" className="block text-sm text-gray-700 font-bold">ไอดีหนังสือ :</label>
                            <input type="text" id="id" className="input w-full border border-gray-300 rounded-md" placeholder="ไอดีหนังสือ" name="id" />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="title" className="block text-sm text-gray-700 font-bold">ชื่อหนังสือ :</label>
                            <input type="text" id="title" className="input w-full border border-gray-300 rounded-md" placeholder="ชื่อหนังสือ" name="title" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                            <div>
                                <div className='flex gap-3 items-center'>
                                    <label htmlFor="createAt" className="block text-sm font-bold text-gray-700 md:w-1/3 text-right">วันที่ยืม:</label>
                                    <input type="date" id="createAt" className="input w-full md:w-3/4 border border-gray-300 rounded-md p-2" name="createAt" required />
                                </div><br />
                                <div className='flex gap-3 items-center'>
                                    <label htmlFor="duedate" className="block text-sm font-bold text-gray-700 md:w-1/3 text-right">วันที่ส่งคืน:</label>
                                    <input type="date" id="duedate" className="input w-full md:w-3/4 border border-gray-300 rounded-md p-2" name="duedate" required />
                                </div><br />
                                <div className='flex gap-3 items-center'>
                                    <label htmlFor="status" className="block text-sm font-bold text-gray-700 md:w-1/3 text-right">สถานะ :</label>
                                    <select id="status" className="input border border-gray-300 rounded-md w-full md:w-3/4" name="status" required>
                                        <option value="">เลือกสถานะ</option>
                                        <option value="PENDING">PENDING</option>
                                        <option value="DOING">DOING</option>
                                        <option value="DONE">DONE</option>
                                    </select>
                                </div><br />
                                <div className='flex gap-3 items-center'>
                                    <label htmlFor="UserID" className="block text-sm font-bold text-gray-700 md:w-1/3 text-right">ไอดี :</label>
                                    <input type="text" id="UserID" className="input w-full md:w-3/4 border border-gray-300 rounded-md p-2" placeholder="ไอดีผู้ใช้งาน" name="UserID" required />
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-3 justify-start'>
                            <Link to="/rentbookAdmin" className="btn btn-outline">ยกเลิก</Link>
                            <button type="submit" className="btn btn-primary">บันทึกข้อมูล</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminRentBookEdit;
