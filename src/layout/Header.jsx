import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';

const guestNav = [
  { to: '/', text: 'เข้าสู่ระบบ' },
  { to: '/register', text: 'สมัครสมาชิก' },
];

const userNav = [
  { to: '/', text: 'หน้าหลัก' },
  { to: '/rentbook', text: 'รายการหนังสือที่ยืม' },
  { to: '/profile', text: 'โปรไฟล์' },
];

const adminNav = [
  { to: '/users', text: 'บัญชีผู้ใช้งาน' },
  { to: '/rentbookAdmin', text: 'รายการหนังสือทั้งหมด' },
  { to: '/profile', text: 'โปรไฟล์' },
];

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 99;
  const finalNav = isAdmin ? adminNav : user?.id ? userNav : guestNav;
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hdlLogout = () => {
    Swal.fire({
      title: 'Warning!',
      text: 'คุณแน่ใจที่จะออกจากระบบ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ออกจากระบบ'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/');
      }
    });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">raysBooks</Link>
      </div>
      <div className="flex-none gap-2">
        {user?.id && (
          <>
          <div className='max-w-screen-sm'>
            <p className='truncate ...'>สวัสดี {user.Displayname}</p>
          </div>
              
              <p>เงินคงเหลือ {new Intl.NumberFormat().format(user.Wallet)} ฿</p>
              {user.Backend === 418 && 
              <Link to="/backend">
              <button className="border-2 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.1 9.2214C18.29 9.2214 17.55 7.9414 18.45 6.3714C18.97 5.4614 18.66 4.3014 17.75 3.7814L16.02 2.7914C15.23 2.3214 14.21 2.6014 13.74 3.3914L13.63 3.5814C12.73 5.1514 11.25 5.1514 10.34 3.5814L10.23 3.3914C9.78 2.6014 8.76 2.3214 7.97 2.7914L6.24 3.7814C5.33 4.3014 5.02 5.4714 5.54 6.3814C6.45 7.9414 5.71 9.2214 3.9 9.2214C2.86 9.2214 2 10.0714 2 11.1214V12.8814C2 13.9214 2.85 14.7814 3.9 14.7814C5.71 14.7814 6.45 16.0614 5.54 17.6314C5.02 18.5414 5.33 19.7014 6.24 20.2214L7.97 21.2114C8.76 21.6814 9.78 21.4014 10.25 20.6114L10.36 20.4214C11.26 18.8514 12.74 18.8514 13.65 20.4214L13.76 20.6114C14.23 21.4014 15.25 21.6814 16.04 21.2114L17.77 20.2214C18.68 19.7014 18.99 18.5314 18.47 17.6314C17.56 16.0614 18.3 14.7814 20.11 14.7814C21.15 14.7814 22.01 13.9314 22.01 12.8814V11.1214C22 10.0814 21.15 9.2214 20.1 9.2214ZM12 15.2514C10.21 15.2514 8.75 13.7914 8.75 12.0014C8.75 10.2114 10.21 8.7514 12 8.7514C13.79 8.7514 15.25 10.2114 15.25 12.0014C15.25 13.7914 13.79 15.2514 12 15.2514Z" fill="#292D32"/>
                </svg>
                <span> หลังบ้าน</span>
              </button></Link>}
          </>
        )}
        <ul className="menu menu-horizontal px-8 flex">
          {/* <li><a>Link</a></li> */}
          <li>
            <details>
              <summary className='pr-8'>
                เมนู&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none z-50">
              {user?.id ? (
              <>
              <li>
                <Link to="/topup">เติมเงิน</Link>
              </li>
              <li>
                <button onClick={hdlLogout} >ออกจากระบบ</button>
              </li>
              </>
            ) : (
              <>
              <li><Link to="/login">เข้าสู่ระบบ</Link></li>
              <li><Link to="/register">สมัครสมาชิก</Link></li>
              </>
            )}
                
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
