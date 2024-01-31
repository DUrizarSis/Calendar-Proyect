import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Styles from "./dayCalendar.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { addEventMini } from "../../redux/eventMiniSlice";


const DayCalendar = () => {

    const dateMini= useSelector(state=> state.eventMini.date)
    const dispatch = useDispatch();
    const localizer = dayjsLocalizer(dayjs);
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

    return (
        <div className={Styles.container}>
            <h1>Day calendar</h1>
            <Calendar
                localizer={localizer}
                views={['day']}
                defaultView={'day'}
                events={events}
                startAccessor={(event) => dayjs(event.start).toDate()}
                endAccessor={(event) => dayjs(event.end).toDate()}
                date={dateMini}
                onNavigate={handleNavigate}
            />
        </div>
    )
}

export default DayCalendar;