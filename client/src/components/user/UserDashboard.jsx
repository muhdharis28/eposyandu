import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserDashboard = () => {
    const navigate = useNavigate();

    // Retrieve the user's name and email from localStorage
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    const handleLogout = () => {
        // Clear all stored data on logout
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-800 text-white flex flex-col">
                <div className="p-6">
                    <h2 className="text-2xl font-bold">Posyandu</h2>
                </div>
                <nav className="flex flex-col flex-grow p-4">
                    <Link to="/user-dashboard" className="py-2 px-4 hover:bg-blue-700 rounded">
                        Dashboard
                    </Link>
                    <Link to="/user-profile" className="py-2 px-4 hover:bg-blue-700 rounded">
                        Profile
                    </Link>
                    <Link to="/user-appointments" className="py-2 px-4 hover:bg-blue-700 rounded">
                        Appointments
                    </Link>
                    <Link to="/user-reports" className="py-2 px-4 hover:bg-blue-700 rounded">
                        Reports
                    </Link>
                    <Link to="/user-settings" className="py-2 px-4 hover:bg-blue-700 rounded">
                        Settings
                    </Link>
                </nav>
                <div className="p-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="text-red-400 hover:text-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded px-4 py-2 w-1/4"
                    />
                </header>

                {/* Profile Section */}
                <div className="bg-white shadow p-4 m-4 rounded">
                    <h2 className="text-xl font-bold">Welcome, {userName}!</h2>
                    <p className="text-gray-700">Email: {userEmail}</p>
                </div>

                {/* Dashboard Stats */}
                <main className="flex-1 p-6 bg-gray-200">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-bold">Upcoming Appointments</h2>
                            <p className="text-4xl">2</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-bold">Reports</h2>
                            <p className="text-4xl">7</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-bold">Notifications</h2>
                            <p className="text-4xl">3</p>
                        </div>
                        <div className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-bold">Health Stats</h2>
                            <p className="text-4xl">Normal</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserDashboard;
