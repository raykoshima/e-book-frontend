import React from 'react';

const Dashboard = () => {
    return (
        <div className="h-screen overflow-hidden">
            <div className="bg-gray-800 text-white h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-8">ยินดีต้อนรับสู่แดชบอร์ดของคุณ</h1>
                    <a href="#content" className="text-xl text-blue-500 hover:underline">เลื่อนลงเพื่อสำรวจ</a>
                </div>
            </div>
            <div id="content" className="h-screen overflow-hidden">
                <div className="bg-gray-100 text-gray-800 h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">เนื้อหาแดชบอร์ด</h2>
                        <p className="text-lg">นี่คือที่ที่คุณสามารถแสดงเนื้อหาแดชบอร์ดของคุณได้</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
