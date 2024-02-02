import axios from "axios";
import { useEffect, useState } from "react";

export default function UserHome() {
    const [ todos , setTodos ] = useState();


    useEffect(()=>{
        let token = localStorage.getItem('token')
        const run = async() =>{
            const rs = await axios.get("http://localhost:3000/todos",{
                headers: {
                    Authorization : `Bearer ${token}`
                }
            })
            console.log(rs)
            setTodos(rs.data)
        }
        run()
    },[])
    return (
        <>
        <div>UserHome</div>
        { JSON.stringify(todos)}
        </>
    )
}