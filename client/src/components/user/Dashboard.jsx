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
  const [associatedLansia, setAssociatedLansia] = useState([]);
  const [associatedBalita, setAssociatedBalita] = useState([]);

  const now = new Date();

  const userId = localStorage.getItem('userId');

  const fetchKegiatan = async () => {
    try {
      const response = await api.get(API_URL);
      setKegiatan(response.data);
    } catch (err) {
      setError('Failed to fetch kegiatan');
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await api.get(`${USER_URL}/${userId}`);
      const wali = response.data.waliDetail.id;
      const orangtua = response.data.orangTuaDetail.id;

      const [lansiaResponse, balitaResponse] = await Promise.all([
        api.get(`/lansia?wali=${wali}`),
        api.get(`/balita?/orangtua=${orangtua}`)
      ]);

      setAssociatedLansia(lansiaResponse.data);
      setAssociatedBalita(balitaResponse.data);
    } catch (error) {
      setError('Failed to fetch user data or associated information');
    }
  };

  const fetchPemeriksaanLansia = async () => {
    if (selectedLansia) {
      try {
        const response = await api.get(`${PEMERIKSAAN_URL}?lansia=${selectedLansia}`);

        setPemeriksaanLansia(response.data);
      } catch (error) {
        setError('Failed to fetch pemeriksaan lansia');
      }
    }
  };

  const fetchPerkembanganBalita = async () => {
    if (selectedBalita) {
      try {
        const response = await api.get(`${PERKEMBANGAN_URL}?balita=${selectedBalita}`);
        setPerkembanganBalita(response.data);
      } catch (error) {
        setError('Failed to fetch perkembangan balita');
      }
    }
  };

  useEffect(() => {
    fetchKegiatan();
    fetchUserData();
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPemeriksaanLansia();
  }, [selectedLansia]);

  useEffect(() => {
    if (associatedLansia.length > 0 && !selectedLansia) {
      setSelectedLansia(associatedLansia[0].id);
    }
    if (associatedBalita.length > 0 && !selectedBalita) {
      setSelectedBalita(associatedBalita[0].id);
    }
  }, [associatedLansia, associatedBalita]);

  useEffect(() => {
    fetchPerkembanganBalita();
  }, [selectedBalita]);

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

  const filteredPemeriksaanLansia = selectedLansia
    ? pemeriksaanLansia.filter((item) => item.lansia === selectedLansia)
    : pemeriksaanLansia;

  const filteredPerkembanganBalita = selectedBalita
    ? perkembanganBalita.filter((item) => item.balita === selectedBalita)
    : perkembanganBalita;

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 min-h-screen">
        {/* Left Column - Lansia Events */}
        <div className="p-8 rounded-lg shadow-lg bg-gradient-to-br from-teal-100 to-teal-200">
          <h3 className="text-2xl font-bold text-teal-800 mb-6">Agenda Lansia</h3>

          {/* Previous Lansia Event */}
          <div className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Agenda Sebelumnya</h4>
            {previousLansiaEvent ? (
              <div className="text-gray-600">
                <p className="font-semibold text-gray-800 text-sm">{previousLansiaEvent.nama}</p>
                <p><strong className="text-gray-700 text-sm">Tanggal:</strong> {new Date(previousLansiaEvent.tanggal).toLocaleDateString()}</p>
                <p><strong className="text-gray-700 text-sm">Deskripsi:</strong> {previousLansiaEvent.deskripsi || 'Tidak ada deskripsi'}</p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Tidak Ada Agenda</p>
            )}
          </div>

          {/* Current Lansia Event */}
          <div className="bg-yellow-200 p-6 rounded-lg mb-6 shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Agenda Hari Ini</h4>
            {currentLansiaEvent ? (
              <div className="text-gray-600">
                <p className="font-semibold text-gray-800 text-sm">{currentLansiaEvent.nama}</p>
                <p><strong className="text-gray-700 text-sm">Tanggal:</strong> {new Date(currentLansiaEvent.tanggal).toLocaleDateString()}</p>
                <p><strong className="text-gray-700 text-sm">Deskripsi:</strong> {currentLansiaEvent.deskripsi || 'Tidak ada deskripsi'}</p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Tidak Ada Agenda</p>
            )}
          </div>

          {/* Next Lansia Event */}
          <div className="bg-green-200 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Agenda Selanjutnya</h4>
            {nextLansiaEvent ? (
              <div className="text-gray-600">
                <p className="font-semibold text-gray-800 text-sm">{nextLansiaEvent.nama}</p>
                <p><strong className="text-gray-700 text-sm">Tanggal:</strong> {new Date(nextLansiaEvent.tanggal).toLocaleDateString()}</p>
                <p><strong className="text-gray-700 text-sm">Deskripsi:</strong> {nextLansiaEvent.deskripsi || 'Tidak ada deskripsi'}</p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Tidak Ada Agenda</p>
            )}
          </div>
        </div>

        {/* Right Column - Balita Events */}
        <div className="p-8 rounded-lg shadow-lg bg-gradient-to-br from-blue-100 to-blue-200">
          <h3 className="text-2xl font-bold text-blue-800 mb-6">Agenda Balita</h3>

          {/* Previous Balita Event */}
          <div className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Agenda Sebelumnya</h4>
            {previousBalitaEvent ? (
              <div className="text-gray-600">
                <p className="font-semibold text-gray-800 text-sm">{previousBalitaEvent.nama}</p>
                <p><strong className="text-gray-700 text-sm">Tanggal:</strong> {new Date(previousBalitaEvent.tanggal).toLocaleDateString()}</p>
                <p><strong className="text-gray-700 text-sm">Deskripsi:</strong> {previousBalitaEvent.deskripsi || 'Tidak ada deskripsi'}</p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Tidak Ada Agenda</p>
            )}
          </div>

          {/* Current Balita Event */}
          <div className="bg-yellow-200 p-6 rounded-lg mb-6 shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Agenda Hari Ini</h4>
            {currentBalitaEvent ? (
              <div className="text-gray-600">
                <p className="font-semibold text-gray-800 text-sm">{currentBalitaEvent.nama}</p>
                <p><strong className="text-gray-700 text-sm">Tanggal:</strong> {new Date(currentBalitaEvent.tanggal).toLocaleDateString()}</p>
                <p><strong className="text-gray-700 text-sm">Deskripsi:</strong> {currentBalitaEvent.deskripsi || 'Tidak ada deskripsi'}</p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Tidak Ada Agenda</p>
            )}
          </div>

          {/* Next Balita Event */}
          <div className="bg-green-200 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">Agenda Selanjutnya</h4>
            {nextBalitaEvent ? (
              <div className="text-gray-600">
                <p className="font-semibold text-gray-800 text-sm">{nextBalitaEvent.nama}</p>
                <p><strong className="text-gray-700 text-sm">Tanggal:</strong> {new Date(nextBalitaEvent.tanggal).toLocaleDateString()}</p>
                <p><strong className="text-gray-700 text-sm">Deskripsi:</strong> {nextBalitaEvent.deskripsi || 'Tidak ada deskripsi'}</p>
              </div>
            ) : (
              <p className="text-gray-600 text-sm">Tidak Ada Agenda</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-8 mt-8">
        {/* Lansia Section */}
        <div className="w-1/2">
          {/* Dropdown for selecting Lansia */}
          <div className="mb-4">
            <label className="text-base font-bold">Pilih Lansia:</label>
            <select
              className="border rounded-md p-2 ml-4 text-sm"
              value={selectedLansia}
              onChange={(e) => setSelectedLansia(e.target.value)}
              disabled={associatedLansia.length === 0}
            >
              {associatedLansia.length === 0 ? (
                <option value="">Tambah data lansia terlebih dahulu</option>
              ) : (
                associatedLansia.map((item) => (
                  <option key={item.id} value={item.nama_lansia}>
                    {item.nama_lansia}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Pemeriksaan Lansia Chart */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Pemeriksaan Lansia</h3>
            <Bar data={pemeriksaanLansiaChartData} options={{ responsive: true }} />
          </div>
        </div>

        {/* Balita Section */}
        <div className="w-1/2">
          {/* Dropdown for selecting Balita */}
          <div className="mb-4">
            <label className="text-base font-bold">Pilih Balita:</label>
            <select
              className="border rounded-md p-2 ml-4 text-sm"
              value={selectedBalita}
              onChange={(e) => setSelectedBalita(e.target.value)}
              disabled={associatedBalita.length === 0}
            >
              {associatedBalita.length === 0 ? (
                <option value="">Tambah data balita terlebih dahulu</option>
              ) : (
                associatedBalita.map((item) => (
                  <option key={item.id} value={item.nama_balita}>
                    {item.nama_balita}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Perkembangan Balita Chart */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Perkembangan Balita</h3>
            <Bar data={perkembanganBalitaChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
