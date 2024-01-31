import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
//import Styles from "./myCalendar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getEvent, getEvents } from "../../redux/eventSlice";
import EventForm from "../eventForm/EventForm";



function MyCalendar({ initialDate}) {
  
  const dispatch = useDispatch();
  const localizer = dayjsLocalizer(dayjs);

  const eventState = useSelector((state) => state.events);
  const events = eventState.events;

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const handleSelectEvent = (selectedEvent) => {
    console.log('Selected Event:', selectedEvent);
    dispatch(getEvent(selectedEvent._id));
    setSelectedEvent(selectedEvent);
    setMode('edit');
    setShowForm(true);
  };

  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mode, setMode] = useState('');

  const handleShowForm = (event) => {
    console.log('Handle Show Form - Event:', event);
    setSelectedEvent(event);
    setMode('add');
    setShowForm(true);
  };

  const handleCloseForm = () => {
    console.log('Handle Close Form');
    setSelectedEvent(null);
    setShowForm(false);
  };

  return (
    
    <div className="max-w-7xl mx-auto p-5 bg-white rounded shadow">
      <div style={{ padding: '20px' }}>
    <h1 className="text-3xl font-bold mb-4">My Calendar</h1>
    <div className="w-full h-screen lg:h-full flex justify-center items-center h-screen">
      <Calendar
        localizer={localizer}
        events={events}
        onSelectEvent={handleSelectEvent}
        selectable
        startAccessor={(event) => dayjs(event.start).toDate()}
        endAccessor={(event) => dayjs(event.end).toDate()}
        onSelectSlot={handleShowForm}
        style={{ width: "90%", height: "80vh", fontSize: "1.2rem" }}
          components={{
    month: {
      header: ({ label, view }) => (
        <div className="text-center">
        <span className="text-5xl font-semibold">{label}</span>
        <span className="text-2xl font-semibold"> {view}</span>
        </div>
      ),
    },
  }}
      />
      </div>
      </div>

      {showForm && (
        <EventForm
          mode={mode}
          event={selectedEvent}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}

export default MyCalendar;