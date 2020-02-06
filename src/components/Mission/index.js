import React from 'react';
import './index.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('ko');
const localizer = momentLocalizer(moment);

const events = [
  {
    title: '빰빠?',
    allDay: true,
    start: new Date(2020, 2, 3),
    end: new Date(2020, 2, 3),
  },
];

const MyCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
);

class Mission extends React.Component {
  render() {
    return <div className="App-Calendar">{}</div>;
  }
}

export default Mission;
