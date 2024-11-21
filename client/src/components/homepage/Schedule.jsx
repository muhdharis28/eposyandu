import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Schedule = ({ selectedPosyandu }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/kegiatan/dashboard?posyandu=${selectedPosyandu}`);
        console.log(response)
        const events = Array.isArray(response.data)
        ? response.data.map((event) => ({
            title: event.nama,
            start: new Date(event.tanggal),
            end: new Date(event.tanggal),
            allDay: true,
            deskripsi: event.deskripsi,
            jenis: event.jenis,
          }))
        : [];
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [selectedPosyandu]);


  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };


  const eventPropGetter = (event) => {
    let backgroundColor = 'gray';
    if (event.jenis === 'balita') {
      backgroundColor = 'red';
    } else if (event.jenis === 'lansia') {
      backgroundColor = 'green';
    }
    return {
      style: {
        backgroundColor,
        whiteSpace: 'normal',
      },
    };
  };


  const getNextEvent = () => {
    const upcomingEvent = events.find((event) => new Date(event.start) >= new Date());
    return upcomingEvent || { title: 'Tidak ada acara mendatang', start: '', deskripsi: '' };
  };


  const getLastEvent = () => {
    const pastEvents = events.filter((event) => new Date(event.start) < new Date());
    const lastEvent = pastEvents[pastEvents.length - 1];
    return lastEvent || { title: 'Tidak ada acara sebelumnya', start: '', deskripsi: '' };
  };

  const nextEvent = getNextEvent();
  const lastEvent = getLastEvent();

  return (
    <section id="jadwal" className="py-20 bg-gradient-to-b from-blue-400 to-blue-600">
      <div className="container mx-auto px-4 lg:px-20">
        <h2 className="text-4xl font-extrabold text-center text-white mb-12">Jadwal Kegiatan</h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3 bg-white shadow-xl rounded-3xl p-6 md:p-8">
            <div className="mb-6 flex justify-center">
              <div className="flex items-center mr-6">
                <div className="w-4 h-4 bg-red-500 mr-2 rounded-full"></div>
                <span className="text-red-500">Bayi</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-2 rounded-full"></div>
                <span className="text-green-500">Lansia</span>
              </div>
            </div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              views={['month']}
              toolbar={true}
              onSelectEvent={handleEventClick}
              eventPropGetter={eventPropGetter}
              className="rounded-xl"
            />
          </div>

          <div className="flex flex-col md:w-1/3 mb-8 md:mb-0 ml-6 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Acara Mendatang</h3>
              <p className="text-lg font-semibold text-blue-600">{nextEvent.title}</p>
              <p className="text-sm text-gray-600"><strong>Tanggal:</strong> {nextEvent.start ? new Date(nextEvent.start).toLocaleDateString() : 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Deskripsi:</strong> {nextEvent.deskripsi || 'Tidak ada deskripsi.'}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg w-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Acara Sebelumnya</h3>
              <p className="text-lg font-semibold text-blue-600">{lastEvent.title}</p>
              <p className="text-sm text-gray-600"><strong>Tanggal:</strong> {lastEvent.start ? new Date(lastEvent.start).toLocaleDateString() : 'N/A'}</p>
              <p className="text-sm text-gray-600"><strong>Deskripsi:</strong> {lastEvent.deskripsi || 'Tidak ada deskripsi.'}</p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            {selectedEvent && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">{selectedEvent.title}</h2>
                <p className="text-lg"><strong>Tanggal:</strong> {selectedEvent.start.toLocaleDateString()}</p>
                <p className="text-lg"><strong>Deskripsi:</strong> {selectedEvent.deskripsi || 'Tidak ada deskripsi.'}</p>
                <button
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-[#008EB3] text-white font-semibold rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105"
                  onClick={closeModal}
                >
                  Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Schedule;
