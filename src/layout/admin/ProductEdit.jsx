import React from 'react'
import axios from "axios";
import { useState, useEffect } from 'react'
import { Link, useParams , useNavigate , useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

export default function ProductEdit() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        Author: '',
        Description: '',
        DownloadUrl: '',
        ImageUrl: '',
        Name:  '',
        Price: '',
        PublishDate: '',
        Tag: ''
    });
    const [searchParams, setSearchParams] = useSearchParams();

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

    const fetchData = async () => {
        try {
            const id = searchParams.get("id")
            const response = await axios.get(`http://localhost:3000/product/id/${id}`);
            if (response.status === 404) {
                // clearRentbook();
                // console.log("got response and it error 404")
            } else {
                if (response.data && response.data.productData) {
                    // console.log(response)
                    setProduct(response.data.productData);
                    
                } else {
                    // clearRentbook();
                    // console.log("got response and it not productData")
                }
            }
        } catch (error) {
            // clearRentbook();
            // setCurrentPage(currentPage - 1);
            console.error("Error fetching RentBook:", error);
        }
        console.log('hi')
    };

    useEffect(() => {
        fetchData();
    }, []);

    const hdlSubmit = async e => {
        try {
            e.preventDefault();
            const localtoken = localStorage.getItem("token");
            const id = searchParams.get("id")
            const editdata = await axios.patch(`http://localhost:3000/backend/product/update/${Number(id)}`, product , {
                headers: { Authorization: `Bearer ${localtoken}` }
            });
            if(editdata.status !== 200){
                Swal.fire({
                    icon: 'error',
                    title: `เกิดข้อผิดพลาด จาก status code ${editdata.status}`,
                    text: 'ไม่สามารถแก้ไขได้',
                }).then(()=> {
                    navigate('/backend/product');
                });
            }else{
            Swal.fire({
                icon: 'success',
                title: 'เรียบร้อย',
                text: 'บันทึกข้อมูลเสร็จสิ้นแล้ว',
            }).then(()=> {
                navigate('/backend/product');
            });
            }
        } catch (err) {
            console.log(err.message);
            Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถแก้ไขได้',
            }).then(()=> {
                navigate('/backend/product');
            });
        }
    };


    const hdlChange = e => {
        setProduct(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    // const hdlShow = () => {
    //     console.log(product)
    // }

    function dateformat(date) {
        const daytime = new Date(date);
        const year = daytime.getFullYear();
        const month = (daytime.getMonth() + 1).toString().padStart(2, '0');
        const day = daytime.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }

    function formatDateBack(formattedDateString) {
        const parts = formattedDateString.split('-');
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; 
        const day = parseInt(parts[2], 10);
        const date = new Date(Date.UTC(year, month, day));
        const isoString = date.toISOString();
        return isoString;
    }
    
    const handleDateChange = (e) => {
        const formattedDate = e.target.value;
        const isoDate = formatDateBack(formattedDate);
        setProduct(prevProduct => ({
            ...prevProduct,
            PublishDate: isoDate
        }));
    }

    return (
        <>
            {product ? (
            <>
            <center><h1>แก้ไข {searchParams.get("name")}</h1></center>
            <div className="flex items-center justify-center p-12">
                <title>backend | {searchParams.get("name")}</title>
                <div className="py-6 w-full">
                    <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 mt-6">
                        <div className="flex flex-col md:flex-row -mx-2">
                            <div className="md:flex-1 px-8">
                                <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                                    <img alt={product.Name} src={product.ImageUrl} className="focus:outline-none w-full h-full" />
                                </div>
                            </div>
                            <div className="md:flex-1 px-8">
                                <div className="mx-auto w-full max-w-[550px]">
                                    <form onSubmit={hdlSubmit}>
                                        <div className="-mx-3 flex flex-wrap">
                                            <div className="w-full px-3 sm:w-1/2">
                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                                    >
                                                        ชื่อหนังสือ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="Name"
                                                        id="Name"
                                                        placeholder="ชื่อหนังสือ"
                                                        value={product.Name}
                                                        onChange={hdlChange}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full px-3 sm:w-1/2">
                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                                    >
                                                        ราคา
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="Price"
                                                        id="Price"
                                                        placeholder="ราคา"
                                                        min="1"
                                                        value={product.Price}
                                                        onChange={hdlChange}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                คำอธิบาย
                                            </label>
                                            <textarea
                                                type="text"
                                                name="Description"
                                                id="Description"
                                                value={product.Description}
                                                onChange={hdlChange}
                                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>

                                        <div className="-mx-3 flex flex-wrap">
                                            <div className="w-full px-3 sm:w-1/2">
                                                <div className="mb-5">
                                                    <label
                                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                                    >
                                                        วันที่จำหน่าย
                                                    </label>
                                                    <input
                                                        type="date"
                                                        name="PublishDate"
                                                        id="PublishDate"
                                                        value={dateformat(product.PublishDate)}
                                                        onChange={handleDateChange}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full px-3 sm:w-1/2">
                                                <div className="mb-5">
                                                    <label
                                                        for="time"
                                                        className="mb-3 block text-base font-medium text-[#07074D]"
                                                    >
                                                        ผู้เขียน
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="Author"
                                                        id="Author"
                                                        value={product.Author}
                                                        onChange={hdlChange}
                                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label
                                                className="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                ลิงค์รูป
                                            </label>
                                            <textarea
                                                type="text"
                                                name="ImageUrl"
                                                id="ImageUrl"
                                                value={product.ImageUrl}
                                                onChange={hdlChange}
                                                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>

                                        <div>
                                            <button
                                                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                            >
                                                Submit
                                            </button>
                                            {/* <label onClick={hdlShow}>showdata</label> */}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
            ) : (
                <div className="flex justify-center">
                  <p className="text-center italic">ไม่มีข้อมูลในรายการ</p>
                </div>
              )}
        </>
    )
}