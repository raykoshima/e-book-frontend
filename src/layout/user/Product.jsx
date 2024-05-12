import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/product/id/${id}`);
            if (response.status === '404') {
                // clearRentbook();
                // console.log("got response and it error 404")
            } else {
                if (response.data && response.data.productData) {
                    console.log(response.data);
                    setProduct(response.data);
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

    return (
        <>
          {/* <title>หน้าแรก</title> */}
            {product.productData ? (
          <div>
            <div className="py-6">
            <title>{product.productData.Name} | กำลังดู</title>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <a href="/" className="hover:underline hover:text-gray-600">Home</a>
                <span>
                  <svg className="h-5 w-5 leading-none text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <a className="hover:underline hover:text-gray-600">{product.productData.Name}</a>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
              <div className="flex flex-col md:flex-row -mx-2">
                <div className="md:flex-1 px-4">
                  <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                    <img alt={product.productData.Name} src={product.productData.ImageUrl} className="focus:outline-none w-full h-full" />
                  </div>
                </div>
                  <div className="md:flex-1 px-4">
                    <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{product.productData.Name}</h2>
                    <p className="text-gray-500 text-sm">Published Date: {new Date(product.productData.PublishDate).toLocaleDateString()}</p>
                    <p className="text-gray-500">{product.productData.Description}</p>
                    <div className="flex items-center space-x-4 my-4">
                      <div>
                        <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                          <span className="text-indigo-400 mr-1 mt-1">฿</span>
                          <span className="font-bold text-indigo-600 text-3xl">{product.productData.Price}</span>
                        </div>
                      </div>
                    </div>
                    <button type="button" className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                      Add to Cart
                    </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
    ) : (
      <div className="flex justify-center">
        <p className="text-center italic">ไม่มีข้อมูลในรายการ</p>
      </div>
    )}
                    </>
                    );
}
