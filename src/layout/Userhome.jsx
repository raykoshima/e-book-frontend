import axios from "axios";
import { useEffect, useState } from "react";

export default function UserHome() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/todos", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTodos(response.data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="container mx-auto mt-10 flex justify-center pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {todos.length === 0 ? (
                        <div className="px-6 py-4 bg-white shadow-md rounded-lg text-center italic">
                            ไม่มีข้อมูลในรายการ
                        </div>
                    ) : (
                        todos.map(todo => (
                            <div key={todo.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <img src={todo.img} alt="Todo Image" className="h-48 w-full object-cover" />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{todo.Title}</div>
                                    <p className="text-gray-700 text-base">{new Date(todo.createdAt).toLocaleString()}</p>
                                    <p className="text-red-500 text-base">ส่งคืน: {new Date(todo.Duedate).toLocaleDateString()}</p>
                                    <p className="text-gray-700 text-base">สถานะ: {todo.Status}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
