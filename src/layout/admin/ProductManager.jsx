import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useParams
import axios from "axios";
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

export default function ProductManager() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.Backend !== Number(import.meta.env.VITE_ROLE)) {
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
                let url = "http://localhost:3001/product/getall";
                if (searchText.length !== 0) {
                    url = `http://localhost:3001/product?q=${searchText}`;
                }
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response)
                setRentBook(response.data);
            } catch (error) {
                setRentBook([])
                console.log("er")
                // console.error("Error fetching Rentbook:", error);
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

    const hldDelete = (id , name) => {
        console.log(`book id was ${id}`)
        Swal.fire({
            title: 'Warning!',
            text: `คุณแน่ใจใช่ไหมที่จะลบ ${name}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'ยกเลิก',
            confirmButtonText: 'ลบหนังสือ'
          }).then((result) => {
            if (result.isConfirmed) {
                deletebook(id)
                console.log("confirm")
              // navigate('/');
            }
          });
    }

    const deletebook = async (id) => {
        const token = localStorage.getItem('token');
        const del = await axios.delete(`http://localhost:3001/backend/product/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(del.status !== 200){
            Swal.fire({
                icon: 'error',
                title: `เกิดข้อผิดพลาด จาก status code ${del.status}`,
                text: 'ไม่สามารถลบได้',
            }).then(()=> {
                navigate('/backend/product');
            });
        }
        window.location.reload();
        console.log(`has delete book id ${id}`)
    }

    return (
        <>
        <title>จัดการหนังสือ</title>
            <div className="flex justify-center items-center">
            <center><p className='text-3xl'>จัดการหนังสือ</p></center>
            </div>
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
                {/* <button className="btn">ลบข้อมูลที่เลือก</button> */}
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>ชื่อหนังสือ</th>
                            <th>คำอธิบาย</th>
                            <th>วันที่จำหน่าย</th>
                            <th>ผู้เขียน</th>
                            <th>ราคา</th>
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
                            rentbook.ProductData && rentbook.ProductData.map(book => (
                                <tr key={book.id}>
                                    <td></td>
                                    <td>
                                        <div className="flex items-center gap-3 block">
                                                <div className="mask w-24 h-24">
                                                    <img src={book.ImageUrl} alt="Avatar Tailwind CSS Component" className='object-contain' />
                                                </div>
                                        </div>
                                    </td>
                                    <td className='font-bold'>{book.Name}</td>
                                    <td className='font-bold'>{book.Description}</td>
                                    <td className='font-bold'>{new Date(book.PublishDate).toLocaleDateString()}</td>
                                    <td className='font-bold'>{book.Author}</td>
                                    <td className='font-bold'>{new Intl.NumberFormat().format(book.Price)} บาท</td>
                                    <td className='flex gap-3'>
                                    <Link to={`/backend/edit?id=${book.id}&name=${book.Name}`} className="btn">แก้ใขข้อมูล</Link>
                                        <button className="btn" onClick={() => hldDelete(book.id,book.Name)}>ลบข้อมูล</button>
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
