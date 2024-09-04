import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/kegiatan`);
        const events = response.data.map(event => ({
          title: event.nama,
          start: new Date(event.tanggal),
          end: new Date(event.tanggal),
          allDay: true,
        }));
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 lg:px-20">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">Jadwal Kegiatan</h2>
        <div className="bg-white shadow-lg rounded-xl p-8">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={['month']}
            toolbar={true}
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Schedule;
