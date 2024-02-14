import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useParams
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
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        let delayTimer;
        const delay = 500;

        const fetchData = async () => {
            try {
                let url = "http://localhost:3000/rentbook/all";
                if (searchText.length !== 0) {
                    url = `http://localhost:3000/rentbook/search?text=${searchText}`;
                }
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRentBook(response.data);
            } catch (error) {
                console.error("Error fetching Rentbook:", error);
            }
        };

        const delayedFetchData = () => {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(fetchData, delay);
        };

        delayedFetchData();
        return () => {
            clearTimeout(delayTimer);
        };
    }, [searchText]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            const allIds = rentbook.RentData.map(book => book.id);
            setSelectedItems(allIds);
        } else {
            setSelectedItems([]);
        }
    };


    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    return (
        <>
            <div className="navbar bg-base-300 flex justify-end gap-4">
                <div>
                    <input
                        type="text"
                        className="input w-full md:w-72 border border-gray-300 rounded-md p-2"
                        placeholder="ค้นหา..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <Link to="/insert" className="btn btn-success">เพิ่มรายการหนังสือ</Link>
                <button className="btn">ลบข้อมูลที่เลือก</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <label className='flex items-center justify-center gap-1'>
                                    <input type="checkbox" className="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    <p>เลือกทั้งหมด</p>
                                </label>
                            </th>
                            <th>ไอดี</th>
                            <th>ชื่อหนังสือ</th>
                            <th>วันที่ยืม</th>
                            <th>ต้องส่งคืน</th>
                            <th>สถานะ</th>
                            <th>แก้ใขข้อมูล / ลบข้อมูล</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentbook.RentData && rentbook.RentData.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <p className="text-center italic">ไม่มีข้อมูลในรายการ</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rentbook.RentData && rentbook.RentData.map(book => (
                                <tr key={book.id}>
                                    <td className='flex justify-center'>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                checked={selectedItems.includes(book.id)}
                                                onChange={() => handleSelectItem(book.id)}
                                            />
                                        </label>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={book.img} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-center items-center font-bold">ID: {book.id}</div>
                                                <div className="flex justify-center items-center text-sm opacity-50"><i className="fa-solid fa-user"></i>{book.UserID}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='font-bold'>{book.Title}</td>
                                    <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                                    <td className='text-red-500'>{new Date(book.Duedate).toLocaleDateString()}</td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs text-green-500">{book.Status}</button>
                                    </td>

                                    <td className='flex gap-3'>
                                    <Link to={`/edit?id=${book.id}`} className="btn">แก้ใขข้อมูล</Link>
                                        <button className="btn">ลบข้อมูล</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
