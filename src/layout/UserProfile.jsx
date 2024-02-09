import axios from "axios";
import { useEffect, useState } from "react";

function UserProfile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching User:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-2 justify-center bg-gray-800 p-10">
            <div className="rounded-md p-10 bg-white">
                <div className="photo-wrapper p-2">
                    <img className="rounded-full mx-auto" src={user.avatar} alt="avatar" width="180px" height="140px" />
                </div>
                <div className="p-2">
                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.Username}</h3>
                    <div className="text-center text-gray-400 text-xs font-semibold">
                        <p>Diaplay Name : {user.display}</p>
                    </div>
                    <table className="text-xs my-3 flex justify-center">
                        <tbody>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">User ID :</td>
                                <td className="px-2 py-2">{user.id}</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Email :</td>
                                <td className="px-2 py-2">{user.Email}</td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2 text-gray-500 font-semibold">Password :</td>
                                <td className="px-2 py-2">**********</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='rounded-md p-10 bg-white'>
                <p className='font-bold'>การนำเข้าข้อมูล รูปภาพ หรือ สื่อต่างๆ</p>
                <label className='text-red-500 font-bold'>ที่นำเสนอแนวทางยั่วยุในกามอารมณ์ ลามกอนาจาร
                    <p>สร้างความเดือดร้อนให้แก่ผู้อื่น สังคม ประเทศ ละเมิดลิขสิทธ์ของผู้อื่น</p>
                    <p>หรือสิ่งหนึ่งสิ่งใดก็แล้วแต่ในลักษณะเดียวกัน</p></label>
                <p>มีความผิดตามกฏหมาย <label className='font-bold'>ทีมงานจะระงับใช้ ID ของท่านโดยไม่มีการแจ้งให้ทราบล่วงหน้า</label></p>
                <hr /><br />
                <div className="flex justify-start">
                    <form className="w-full max-w-sm">
                        <div className="md:flex md:items-center mb-3">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    ชื่อผู้ใช้
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" type="text" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-3">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    ชื่อที่แสดง
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" type="text" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-3">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    อีเมล
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-whit" type="text" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-3">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    รหัสผ่าน
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" type="password" placeholder="******************" />
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3"></div>
                            <div className="md:w-2/3">
                                <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                    บันทึกข้อมูล
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
