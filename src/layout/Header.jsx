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
        <ul className="menu menu-horizontal px-8">
          {/* <li><a>Link</a></li> */}
          <li>
            <details>
              <summary className='pr-8'>
                เมนู
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li><Link to="/login">เข้าสู่ระบบ</Link></li>
                <li><Link to="/register">สมัครสมาชิก</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
