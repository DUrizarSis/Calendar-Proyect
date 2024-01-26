import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import Styles from "./myCalendar.module.css";

function MyCalendar() {

  const localizer = dayjsLocalizer(dayjs);

  return (
    <div className={Styles.container}>
      <h1>My Calendar</h1>
      <Calendar
      localizer={localizer}
      />

    </div>
  );
}

export default MyCalendar;