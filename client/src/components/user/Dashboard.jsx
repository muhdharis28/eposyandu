import React, { useEffect, useState } from 'react';
import api from '../../api'; // Import the Axios instance, adjust the path as necessary
import { FaCalendarAlt, FaClock, FaHistory } from 'react-icons/fa';

const API_URL = '/kegiatan'; // Define the endpoint for kegiatan
const USER_URL = '/pengguna'; // Define the endpoint for fetching user details

const Dashboard = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('Lansia'); // Tabs: Lansia, Balita
  const [userData, setUserData] = useState({}); // User-specific data

  const fetchKegiatan = async () => {
    try {
      const response = await api.get(API_URL); // Fetch kegiatan from API
      setKegiatan(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch kegiatan');
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get(USER_URL); // Fetch user-specific data (Lansia/Balita status)
      setUserData(response.data); // Assuming the response contains user details like 'hasLansia', 'hasBalita'
    } catch (err) {
      console.error('Failed to fetch user data', err);
    }
  };

  useEffect(() => {
    fetchKegiatan();
    fetchUserData();
  }, []);

  const now = new Date();

  const getFilteredEvents = (jenis) => {
    return kegiatan.filter((event) => event.jenis === jenis);
  };

  const getPreviousEvent = (filteredEvents) => {
    return filteredEvents
      .filter((event) => new Date(event.tanggal) < now)
      .reverse()[0] || null; // Get the most recent past event
  };

  const getCurrentEvent = (filteredEvents) => {
    return filteredEvents.find((event) => {
      const eventDate = new Date(event.tanggal);
      return eventDate.toDateString() === now.toDateString(); // Check if event is happening today
    });
  };

  const getNextEvent = (filteredEvents) => {
    return filteredEvents.find((event) => new Date(event.tanggal) > now) || null; // Get the next upcoming event
  };

  // Filtered events based on active tab
  const filteredEvents = getFilteredEvents(activeTab.toLowerCase());
  const previousEvent = getPreviousEvent(filteredEvents);
  const currentEvent = getCurrentEvent(filteredEvents);
  const nextEvent = getNextEvent(filteredEvents);

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-64 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6 min-h-screen mt-12">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">Dashboard</h2>

        {/* Tabs for Lansia and Balita */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 text-lg font-bold border-b-2 ${activeTab === 'Lansia' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('Lansia')}
          >
            Lansia
          </button>
          <button
            className={`px-6 py-2 ml-4 text-lg font-bold border-b-2 ${activeTab === 'Balita' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500'}`}
            onClick={() => setActiveTab('Balita')}
          >
            Balita
          </button>
        </div>

        {/* Three-Column Layout for Previous, Current, and Next Events */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Previous Event */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            {previousEvent ? (
              <div className="flex items-center">
                <FaHistory className="text-3xl text-gray-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Previous Event</h3>
                  <p className="text-gray-600"><strong>{previousEvent.nama}</strong></p>
                  <p className="text-gray-500"><strong>Date:</strong> {new Date(previousEvent.tanggal).toLocaleDateString()}</p>
                  <p className="text-gray-500"><strong>Description:</strong> {previousEvent.deskripsi || 'No description available'}</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600">No previous events found</p>
            )}
          </div>

          {/* Current Event */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-lg">
            {currentEvent ? (
              <div className="flex items-center">
                <FaClock className="text-3xl text-yellow-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Current Event</h3>
                  <p className="text-gray-600"><strong>{currentEvent.nama}</strong></p>
                  <p className="text-gray-500"><strong>Date:</strong> {new Date(currentEvent.tanggal).toLocaleDateString()}</p>
                  <p className="text-gray-500"><strong>Description:</strong> {currentEvent.deskripsi || 'No description available'}</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-bold text-red-600">No events happening today</h3>
              </div>
            )}
          </div>

          {/* Next Event */}
          <div className="bg-green-100 p-6 rounded-lg shadow-lg">
            {nextEvent ? (
              <div className="flex items-center">
                <FaCalendarAlt className="text-3xl text-green-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Next Event</h3>
                  <p className="text-gray-600"><strong>{nextEvent.nama}</strong></p>
                  <p className="text-gray-500"><strong>Date:</strong> {new Date(nextEvent.tanggal).toLocaleDateString()}</p>
                  <p className="text-gray-500"><strong>Description:</strong> {nextEvent.deskripsi || 'No description available'}</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-600">No upcoming events found</p>
            )}
          </div>
        </div>

        {/* User-specific Kegiatan (Lansia or Balita) */}
        {userData.hasLansia && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800">Lansia-specific Events</h3>
            {/* Display Lansia-specific events below */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredEvents.map(event => (
                <div key={event.id} className="p-6 bg-white rounded-lg shadow-lg">
                  <h4 className="text-lg font-bold">{event.nama}</h4>
                  <p className="text-gray-500">{new Date(event.tanggal).toLocaleDateString()}</p>
                  <p className="text-gray-600">{event.deskripsi || 'No description available'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {userData.hasBalita && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800">Balita-specific Events</h3>
            {/* Display Balita-specific events below */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {filteredEvents.map(event => (
                <div key={event.id} className="p-6 bg-white rounded-lg shadow-lg">
                  <h4 className="text-lg font-bold">{event.nama}</h4>
                  <p className="text-gray-500">{new Date(event.tanggal).toLocaleDateString()}</p>
                  <p className="text-gray-600">{event.deskripsi || 'No description available'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
