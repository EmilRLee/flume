import React, { Component } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "./App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);


export default class ServiceScheduler extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: [
              {
                start: moment().toDate(),
                end: moment()
                  .add(5, "days")
                  .toDate(),
                title: "Gage Service Installation"
              }
            ]
          };
    }

    onEventResize = (data) => {
        const { start, end } = data;
    
        this.setState((state) => {
          state.events[0].start = start;
          state.events[0].end = end;
          return { events: [...state.events] };
        });
      };
    
      onEventDrop = (data) => {
        console.log(data);
      };
    
      render() {
        return (
          <div className="App">
            <DnDCalendar
              defaultDate={moment().toDate()}
              defaultView="month"
              events={this.state.events}
              localizer={localizer}
              onEventDrop={this.onEventDrop}
              onEventResize={this.onEventResize}
              resizable
              style={{ height: "100vh" }}
            />
          </div>
        );
      }
}