import React, { useEffect, useState } from 'react';
import api from '../../api'; // Import the Axios instance
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = '/kegiatan'; // Define the endpoint for kegiatan
const USER_URL = '/pengguna'; // Define the endpoint for fetching user details
const PEMERIKSAAN_URL = '/pemeriksaan-lansia'; // Endpoint for pemeriksaan lansia
const PERKEMBANGAN_URL = '/perkembangan-balita'; // Endpoint for perkembangan balita

const Dashboard = () => {
  const [kegiatan, setKegiatan] = useState([]);
  const [pemeriksaanLansia, setPemeriksaanLansia] = useState([]);
  const [perkembanganBalita, setPerkembanganBalita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLansia, setSelectedLansia] = useState('');
  const [selectedBalita, setSelectedBalita] = useState('');
  const [userData, setUserData] = useState(null); // Logged-in user data
  const [associatedLansia, setAssociatedLansia] = useState([]);
  const [associatedBalita, setAssociatedBalita] = useState([]);

  const now = new Date();

  const fetchKegiatan = async () => {
    try {
      const response = await api.get(API_URL); // Fetch kegiatan from API
      setKegiatan(response.data);
    } catch (err) {
      setError('Failed to fetch kegiatan');
    }
  };

  const fetchPemeriksaanLansia = async (userId) => {
    try {
      const response = await api.get(`${PEMERIKSAAN_URL}?userId=${userId}`); // Fetch pemeriksaan lansia linked to the user
      setPemeriksaanLansia(response.data);
    } catch (err) {
      setError('Failed to fetch pemeriksaan lansia');
    }
  };

  const fetchPerkembanganBalita = async (userId) => {
    try {
      const response = await api.get(`${PERKEMBANGAN_URL}?userId=${userId}`); // Fetch perkembangan balita linked to the user
      setPerkembanganBalita(response.data);
    } catch (err) {
      setError('Failed to fetch perkembangan balita');
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get(USER_URL); // Fetch logged-in user data
      setUserData(response.data);
    } catch (err) {
      console.error('Failed to fetch user data', err);
    }
  };

  const fetchAssociatedLansiaBalita = async (userId) => {
    try {
      const lansiaResponse = await api.get(`/lansia?userId=${userId}`); // Fetch Lansia associated with the user
      const balitaResponse = await api.get(`/balita?userId=${userId}`); // Fetch Balita associated with the user

      setAssociatedLansia(lansiaResponse.data); // Set Lansia associated with the user
      setAssociatedBalita(balitaResponse.data); // Set Balita associated with the user
    } catch (err) {
      console.error('Failed to fetch associated Lansia or Balita data', err);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage

    fetchKegiatan();
    fetchUserData();
    fetchAssociatedLansiaBalita(userId);
    fetchPemeriksaanLansia(userId);
    fetchPerkembanganBalita(userId);
    setLoading(false);
  }, []);

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

  // Filter pemeriksaan lansia based on selected Lansia
  const filteredPemeriksaanLansia = selectedLansia
    ? pemeriksaanLansia.filter((item) => item.lansiaDetail.nama_lansia === selectedLansia)
    : pemeriksaanLansia;

  // Filter perkembangan balita based on selected Balita
  const filteredPerkembanganBalita = selectedBalita
    ? perkembanganBalita.filter((item) => item.nama_balita === selectedBalita)
    : perkembanganBalita;

  // Prepare data for Pemeriksaan Lansia chart
  const pemeriksaanLansiaChartData = {
    labels: filteredPemeriksaanLansia.map((item) => new Date(item.tanggal_kunjungan).toLocaleDateString()),
    datasets: [
      {
        label: 'Berat Badan (kg)',
        data: filteredPemeriksaanLansia.map((item) => item.berat_badan),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tinggi Badan (cm)',
        data: filteredPemeriksaanLansia.map((item) => item.tinggi_badan),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Gula Darah (mg/dL)',
        data: filteredPemeriksaanLansia.map((item) => item.gula_darah),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Asam Urat (mg/dL)',
        data: filteredPemeriksaanLansia.map((item) => item.asam_urat),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Perkembangan Balita chart
  const perkembanganBalitaChartData = {
    labels: filteredPerkembanganBalita.map((item) => new Date(item.tanggal_kunjungan).toLocaleDateString()),
    datasets: [
      {
        label: 'Berat Badan (kg)',
        data: filteredPerkembanganBalita.map((item) => item.berat_badan),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tinggi Badan (cm)',
        data: filteredPerkembanganBalita.map((item) => item.tinggi_badan),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-64 text-red-600">{error}</div>;
  }

  // Fetching previous, current, and next events for Lansia
  const lansiaEvents = getFilteredEvents('lansia');
  const previousLansiaEvent = getPreviousEvent(lansiaEvents);
  const currentLansiaEvent = getCurrentEvent(lansiaEvents);
  const nextLansiaEvent = getNextEvent(lansiaEvents);

  // Fetching previous, current, and next events for Balita
  const balitaEvents = getFilteredEvents('balita');
  const previousBalitaEvent = getPreviousEvent(balitaEvents);
  const currentBalitaEvent = getCurrentEvent(balitaEvents);
  const nextBalitaEvent = getNextEvent(balitaEvents);

  return (
    <div className="p-6 min-h-screen mt-12">
      {/* Event Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Lansia Events */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Lansia Events</h3>

          {/* Previous Lansia Event */}
          <div className="bg-gray-200 p-4 rounded-lg mb-4">
            <h4 className="text-xl font-bold text-gray-700">Previous Event</h4>
            {previousLansiaEvent ? (
              <div>
                <p className="text-gray-600"><strong>{previousLansiaEvent.nama}</strong></p>
                <p className="text-gray-500"><strong>Date:</strong> {new Date(previousLansiaEvent.tanggal).toLocaleDateString()}</p>
                <p className="text-gray-500"><strong>Description:</strong> {previousLansiaEvent.deskripsi || 'No description available'}</p>
              </div>
            ) : (
              <p className="text-gray-600">No previous events found</p>
            )}
          </div>

          {/* Current Lansia Event */}
          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <h4 className="text-xl font-bold text-gray-700">Current Event</h4>
            {currentLansiaEvent ? (
              <div>
                <p className="text-gray-600"><strong>{currentLansiaEvent.nama}</strong></p>
                <p className="text-gray-500"><strong>Date:</strong> {new Date(currentLansiaEvent.tanggal).toLocaleDateString()}</p>
                <p className="text-gray-500"><strong>Description:</strong> {currentLansiaEvent.deskripsi || 'No description available'}</p>
              </div>
            ) : (
              <p className="text-gray-600">No events happening today</p>
            )}
          </div>

          {/* Next Lansia Event */}
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="text-xl font-bold text-gray-700">Next Event</h4>
            {nextLansiaEvent ? (
              <div>
                <p className="text-gray-600"><strong>{nextLansiaEvent.nama}</strong></p>
                <p className="text-gray-500"><strong>Date:</strong> {new Date(nextLansiaEvent.tanggal).toLocaleDateString()}</p>
                <p className="text-gray-500"><strong>Description:</strong> {nextLansiaEvent.deskripsi || 'No description available'}</p>
              </div>
            ) : (
              <p className="text-gray-600">No upcoming events found</p>
            )}
          </div>
        </div>

        {/* Right Column - Balita Events */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Balita Events</h3>

          {/* Previous Balita Event */}
          <div className="bg-gray-200 p-4 rounded-lg mb-4">
            <h4 className="text-xl font-bold text-gray-700">Previous Event</h4>
            {previousBalitaEvent ? (
              <div>
                <p className="text-gray-600"><strong>{previousBalitaEvent.nama}</strong></p>
                <p className="text-gray-500"><strong>Date:</strong> {new Date(previousBalitaEvent.tanggal).toLocaleDateString()}</p>
                <p className="text-gray-500"><strong>Description:</strong> {previousBalitaEvent.deskripsi || 'No description available'}</p>
              </div>
            ) : (
              <p className="text-gray-600">No previous events found</p>
            )}
          </div>

          {/* Current Balita Event */}
          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <h4 className="text-xl font-bold text-gray-700">Current Event</h4>
            {currentBalitaEvent ? (
              <div>
                <p className="text-gray-600"><strong>{currentBalitaEvent.nama}</strong></p>
                <p className="text-gray-500"><strong>Date:</strong> {new Date(currentBalitaEvent.tanggal).toLocaleDateString()}</p>
                <p className="text-gray-500"><strong>Description:</strong> {currentBalitaEvent.deskripsi || 'No description available'}</p>
              </div>
            ) : (
              <p className="text-gray-600">No events happening today</p>
            )}
          </div>

          {/* Next Balita Event */}
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="text-xl font-bold text-gray-700">Next Event</h4>
            {nextBalitaEvent ? (
              <div>
                <p className="text-gray-600"><strong>{nextBalitaEvent.nama}</strong></p>
                <p className="text-gray-500"><strong>Date:</strong> {new Date(nextBalitaEvent.tanggal).toLocaleDateString()}</p>
                <p className="text-gray-500"><strong>Description:</strong> {nextBalitaEvent.deskripsi || 'No description available'}</p>
              </div>
            ) : (
              <p className="text-gray-600">No upcoming events found</p>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown for selecting Lansia */}
      <div className="mt-8">
        <label className="text-xl font-bold">Select Lansia:</label>
        <select
          className="border rounded-md p-2 ml-4"
          value={selectedLansia}
          onChange={(e) => setSelectedLansia(e.target.value)}
        >
          {associatedLansia.map((item) => (
            <option key={item.id} value={item.nama_lansia}>
              {item.nama_lansia}
            </option>
          ))}
        </select>
      </div>

      {/* Pemeriksaan Lansia Chart */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Pemeriksaan Lansia</h3>
        <Bar data={pemeriksaanLansiaChartData} options={{ responsive: true }} />
      </div>

      {/* Dropdown for selecting Balita */}
      <div className="mt-8">
        <label className="text-xl font-bold">Select Balita:</label>
        <select
          className="border rounded-md p-2 ml-4"
          value={selectedBalita}
          onChange={(e) => setSelectedBalita(e.target.value)}
        >
          {associatedBalita.map((item) => (
            <option key={item.id} value={item.nama_balita}>
              {item.nama_balita}
            </option>
          ))}
        </select>
      </div>

      {/* Perkembangan Balita Chart */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Perkembangan Balita</h3>
        <Bar data={perkembanganBalitaChartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Dashboard;
