import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup moment localizer
const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // To store the selected event
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/kegiatan`);
        const events = response.data.map(event => ({
          title: event.nama,
          start: new Date(event.tanggal),
          end: new Date(event.tanggal),
          allDay: true,
          deskripsi: event.deskripsi, // Assuming deskripsi is available
          jenis: event.jenis, // Assuming you have a field to differentiate bayi or lansia
        }));
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Handle event click to show modal with event details
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Set the selected event
    setIsModalOpen(true); // Open modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  // Function to get different colors based on event type
  const eventPropGetter = (event) => {
    let backgroundColor = 'gray'; // Default color for other events
    if (event.jenis === 'balita') {
      backgroundColor = 'red'; // Color for Bayi events
    } else if (event.jenis === 'lansia') {
      backgroundColor = 'blue'; // Color for Lansia events
    }
    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">Jadwal Kegiatan</h2>
        
        {/* Legend Section */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center mr-6">
            <div className="w-4 h-4 bg-red-500 mr-2 rounded-full"></div>
            <span>Bayi</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 mr-2 rounded-full"></div>
            <span>Lansia</span>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={['month']}
            toolbar={true}
            onSelectEvent={handleEventClick} // Handle event clicks
            eventPropGetter={eventPropGetter} // Apply custom styles based on event type
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Custom Modal for event details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            {selectedEvent && (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">{selectedEvent.title}</h2>
                <p className="text-lg"><strong>Tanggal:</strong> {selectedEvent.start.toLocaleDateString()}</p>
                <p className="text-lg"><strong>Deskripsi:</strong> {selectedEvent.deskripsi || 'Tidak ada deskripsi.'}</p>
                <button
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform transition hover:scale-105"
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
