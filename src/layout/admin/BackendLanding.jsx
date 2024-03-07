import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useParams
import axios from "axios";
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const BackendLanding = () => {
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
    
    return (
        <div className="h-screen overflow-hidden">
            <title>ระบบหลังบ้าน</title>
            <center><p className='text-4xl'>จัดการหลังบ้าน</p></center>
            <hr></hr>
            <div class="flex justify-center items-center h-3/6">
            <Link to="/backend/product"><button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">จัดการหนังสือ</button></Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Responsive</button>
            </div>
        </div>
    );
}

export default BackendLanding;
