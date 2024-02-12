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
import { getEventsforProjectAndIdUser } from "../../redux/eventSlice";


const DayCalendar = ({eventStyleGetter,handleSelectEvent, handleShowForm, handleCloseForm}) => {
    
    const dateMini= useSelector(state=> state.eventMini.date)
    const dispatch = useDispatch();
    const localizer = dayjsLocalizer(dayjs);
    const { showForm, selectedEvent, mode } = useSelector(state => state.showForm);
    const today = new Date();
      //Event state global
    const eventState = useSelector(state => state.events);
    //Events state
      const events = eventState.events;

    // Función para manejar cambios en la fecha del Calendar
    const handleNavigate = (date, view) => {
    // Convierte la fecha a un formato que necesites, por ejemplo, a una cadena de texto
    const formattedDate = date.toISOString();

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
  

  const accessYourCalendar = localStorage.getItem('accessYourCalender');
  const userData = useSelector(state => state.loginForm.logUserData);
  useEffect(() => {
    if (userData && accessYourCalendar === 'false') {
        dispatch(getEvents(userData._id));
    } else {
        const calenderJSON = localStorage.getItem('useDatacalender');
        if (calenderJSON) {
            const { useDataCalender } = JSON.parse(calenderJSON);
            dispatch(getEventsforProjectAndIdUser(useDataCalender));
        } else {
            console.error('El valor de calenderJSON es null');
            // Maneja este caso según sea necesario
        }
    }
}, [dispatch, userData, accessYourCalendar]);

    return (

      <div className={styles.container}>
            <Calendar
                localizer={localizer}
                defaultView={'month'}
                events={events}
                min={today}
                selectable
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleShowForm}
                startAccessor={(event) => dayjs(event.start).toDate()}
                endAccessor={(event) => dayjs(event.end).toDate()}
                date={dateMini}
                onNavigate={handleNavigate}
                eventPropGetter={eventStyleGetter}
                style={{ width: '67em', height: '86vh'}}
                />

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