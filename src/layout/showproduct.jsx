import axios from "axios";
import { useEffect, useState } from "react";

export default function Showproduct() {
    const [rentbook, setRentBook] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/product/page/${currentPage}`);
            if (response.status === '404') {
                clearRentbook();
                console.log("got response and it error 404")
            } else {
                if (response.data && response.data.ProductData) {
                    setRentBook(response.data);
                } else {
                    clearRentbook();
                    console.log("got response and it not ProductData")
                }
            }
        } catch (error) {
            // clearRentbook();
            setCurrentPage(currentPage - 1);
            // console.error("Error fetching RentBook:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const clearRentbook = () => {
        setRentBook([])
    }

    return (
        <>
        <title>หน้าแรก</title>
                    <div  className="focus:outline-none">
                        <div className="mx-auto container py-8">
                            <div className="flex flex-wrap items-center lg:justify-between justify-center">
                        {rentbook.length === 0 ? (
                                    <div className="flex justify-center">
                                        <p className="text-center italic">ไม่มีข้อมูลในรายการ</p>
                                    </div>
                        ) : (
                            rentbook.ProductData.map((rentbook) => (
                            <a href={`/product/${rentbook.id}`} key={rentbook.id}>
                              <div className="focus:outline-none mx-2 w-72 xl:mb-0 mb-8">
                                <div>
                                    <img alt="person capturing an image" src="https://cdn.tuk.dev/assets/templates/classified/Bitmap (1).png"  className="focus:outline-none w-full h-44" />
                                </div>
                                <div className="bg-white">
                                    <div className="p-4">
                                        <div className="flex items-center">
                                            <h2  className="focus:outline-none text-lg font-semibold">{rentbook.Name}</h2>
                                            <p  className="focus:outline-none text-xs text-gray-600 pl-5">จำหน่าย {new Date(rentbook.PublishDate).toLocaleDateString()}</p>
                                        </div>
                                        <p  className="focus:outline-none text-xs text-gray-600 mt-2">{rentbook.Description}</p>
                                        <div className="flex items-center justify-between py-4">
                                            <h2  className="focus:outline-none text-indigo-700 text-xs font-semibold">${rentbook.Price}</h2>
                                            <h3  className="focus:outline-none text-indigo-700 text-xl font-semibold"></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </a>
                            ))
                        )}
                    {/* </tbody>
                </table>
            </div> */}
                    </div>
                </div>
            </div>
            <div><center>
                <button onClick={goToPreviousPage}>ก่อนหน้า</button>
                {/* <span>| Page {currentPage} |</span> */}
                <span> | </span>
                <button onClick={goToNextPage}>ถัดไป</button>
                {/* <span> | </span>
                <button onClick={clearRentbook}>ล้าง</button> */}
                </center>
            </div>
        </>
    );
}
