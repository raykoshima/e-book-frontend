import axios from "axios";
import { useEffect, useState } from "react";

export default function RentBook() {
    const [rentbook, setRentBook] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/product/getall", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRentBook(response.data);
            } catch (error) {
                console.error("Error fetching RentBook:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                <p>Name</p>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <p>Description</p>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <p>PublishDate</p>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <p>Author</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentbook && rentbook.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <p className="text-center italic">ไม่มีข้อมูลในรายการ</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            // JSON.stringify(rentbook)
                            rentbook.ProductData.map((rentbook)=>(
                                <tr key={rentbook.id}>
                                    <td className="px-6 py-4 text-center">
                                        <p className="flex">{rentbook.Name}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <p className="flex">{rentbook.Description}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <p className="flex">{rentbook.PublishDate}</p>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <p className="flex">{rentbook.Author}</p>
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
