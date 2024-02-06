import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import styles from "./dayCalendar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from "react";
import { addEventMini } from "../../redux/eventMiniSlice";
import EventForm from "../eventForm/EventForm";
import { addShowForm } from "../../redux/showFormSlice";
import { getEvents } from "../../redux/eventSlice";


const DayCalendar = ({eventStyleGetter,handleSelectEvent, handleShowForm, handleCloseForm, logout}) => {

    const dateMini= useSelector(state=> state.eventMini.date)
    const dispatch = useDispatch();
    const localizer = dayjsLocalizer(dayjs);
    const { showForm, selectedEvent, mode } = useSelector(state => state.showForm);

      //Event state global
    const eventState = useSelector(state => state.events);
    //Events state
      const events = eventState.events;

    // Función para manejar cambios en la fecha del Calendar
    const handleNavigate = (date, view) => {
    // Convierte la fecha a un formato que necesites, por ejemplo, a una cadena de texto
    const formattedDate = date.toISOString();

    console.log(formattedDate);

    // Actualiza dateMini en el estado global
    dispatch(addEventMini(formattedDate));
  };
  // cierra el formuario cuando crea el componente
  useEffect(()=>{
    dispatch(addShowForm(false))
  },[])

  useEffect(() => {
    // Configura el evento onNavigate para que llame a handleNavigate
    // cada vez que cambies la vista o la fecha en el Calendar
    const calendarEl = document.querySelector('.rbc-calendar'); // Puedes ajustar la clase según la versión de react-big-calendar
    if (calendarEl) {
      calendarEl.addEventListener('navigate', handleNavigate);
    }

    // Limpia el evento al desmontar el componente
    return () => {
      if (calendarEl) {
        calendarEl.removeEventListener('navigate', handleNavigate);
      }
    };
  }, [dispatch]); // Asegúrate de incluir dispatch como dependencia para evitar advertencias de ESLint
  
  const handleLogout = () => {
    logout();
  }
  
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

    return (

      <div className={styles.container}>

        <div className={styles.nav}>
            <h1>Day calendar</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div className={styles.calendar}>
            <Calendar
                localizer={localizer}
                defaultView={'month'}
                events={events}
                selectable
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleShowForm}
                startAccessor={(event) => dayjs(event.start).toDate()}
                endAccessor={(event) => dayjs(event.end).toDate()}
                date={dateMini}
                onNavigate={handleNavigate}
                eventPropGetter={eventStyleGetter}
                style={{ width: '69vw', height: '75vh'}}
                />
          </div>

            {showForm && (
              <EventForm
              mode={mode}
              event={selectedEvent}
              onCancel={handleCloseForm}
              />
              )}

          </div>
    )
}

export default DayCalendar;