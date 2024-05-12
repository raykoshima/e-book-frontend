import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function topup() {
    const [input, setInput] = useState({amount: '1'})
    const [history, setHistory] = useState([])

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
    }

    const hdlSubmit = async e => {
        try {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const rs = await axios.post('http://localhost:3001/topup', input, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(rs)
            if (rs.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Topup Successful',
                    text: 'ส่งคำขอสำเร็จ',
                    timer: 1500
                }).then(() => {
                    window.location.href = '/topup';
                });
            }
        } catch (err) {
            console.log(err.message)
            Swal.fire({
                icon: 'error',
                title: 'Topup Failed',
                text: 'เกิดข้อผิดพลาดระหว่างการเติมเงิน กรุณาลองใหม่อีกครั้งในภายหลัง.'
            });
        }
    };

    const showHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get("http://localhost:3001/topup/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data)
            setHistory(response.data);
        } catch (error) {
            console.error("Error fetching RentBook:", error);
        }
    }
    useEffect(()=>{
        // console.log("run first")
        showHistory();
    },[])

    function showStatus(Status){
        if(Status === "PENDING"){
            return "รอยืนยัน"
        }
        if(Status === "PAID"){
            return "จ่ายแล้ว"
        }
        if(Status === "CANCEL"){
            return "ยกเลิก"
        }
    } 

    return (
        <>
        <title>เติมเงิน</title>
                <div className='flex flex-col lg:flex-row flex h-fit justify-center p-10'>
                    <div className="container mx-auto mt-20">
                        <form onSubmit={hdlSubmit} className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-2xl mb-6 text-center font-semibold">เติมเงิน</h2>
                            
                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">จำนวนเงิน (บาท)</label>
                                <input type="number" id="amount" min="1" name="amount" value={input.amount} onChange={hdlChange} className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:border-blue-500" />
                            </div>
                            <button type="submit" onChange={hdlSubmit} className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">ส่งคำขอ</button>
                        </form>
                    </div>
                </div>

                <div className='flex flex-col lg:flex-row flex h-fit justify-center p-10'>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2">ประวัติการเติมเงิน</th>
                            </tr>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">จำนวนเงิน</th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">สถานะ</th>
                            </tr>
                        </thead>
                        <tbody>
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan="2"><center>ไม่มีข้อมูลในรายการ</center></td>
                            </tr>
                        ) : (
                            history.map((history) => (
                                <tr key={history.id}>
                                    <td>฿ {new Intl.NumberFormat().format(history.Amount)}</td>
                                    <td>{showStatus(history.Status)}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
        </>
    );
}
