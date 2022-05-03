import { Component, OnInit } from '@angular/core';
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { RequestsService } from 'app/requests/requests.service';
import * as moment from 'moment';
import { Subject } from 'rxjs';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
    schedule;

    viewDate: Date = new Date();

    events: CalendarEvent[] = [
    ];

    excludeDays: number[] = [0, 6];

    hours = [8,9,10,11,12,13,14,15];

    weekStartsOn = DAYS_OF_WEEK.SUNDAY;

    refresh = new Subject<void>();

    constructor(private requests: RequestsService) {}

    ngOnInit(){
      this.generateCalendar();
      this.loadInData();
    }

    loadInData() {
      this.requests.retrieveSlots().subscribe(data => {
        const appointments = data;
        const today = moment().startOf('day');
        const initialSchedule = {};
        const schedule = Object.keys(appointments).length === 0 ? initialSchedule :
        appointments.reduce((currSchedule, appointment) => {
          console.log(appointment);
          const { slot_date, slot_time } = appointment;
          const dateString = moment(slot_date, "YYYY-MM-DD").format("YYYY-MM-DD");
          !currSchedule[slot_date] ? (currSchedule[dateString] = Array(8).fill(false)): null;
          Array.isArray(currSchedule[dateString]) ? 
          (currSchedule[dateString][slot_time] = true) : null;
          return currSchedule;
        }, initialSchedule);

        console.log(schedule);
        for (let day in schedule) {
          let slots = schedule[day];
          slots.length ? slots.every(slot=> slot === true) ? schedule[day] = true : null : null;
        }

        this.schedule = schedule;
        for (const [key, value] of Object.entries(this.schedule)) {
          this.events.forEach((event, index) => {
            if (key.split("-")[1]) {
            const year = key.split("-")[0];
            const month = key.split("-")[1].length === 1 ? '0' + key.split("-")[1] : key.split("-")[1];
            const day = key.split("-")[2].length === 1 ? '0' + key.split("-")[2] : key.split("-")[2];

            let eventMonth = (event.start.getMonth() + 1 ).toString().length === 1 ? '0' + (event.start.getMonth() + 1 ).toString() : (event.start.getMonth() + 1 ).toString();
            let eventDay = event.start.getDate().toString().length === 1 ? '0' + event.start.getDate().toString() : event.start.getDate().toString();
            if (eventDay === day && event.start.getFullYear().toString() === year && eventMonth === month) {
              if (Array.isArray(value)) {
                value.forEach((currValue, ind) => {
                  if (currValue && this.hours[ind] === event.start.getHours()) {
                    this.events[index].title = 'FOGLALT';
                    this.events[index].color = {
                      primary: '#F50501',
                      secondary: '#DB2100'
                    };
                    console.log(event.start.getHours(), event.start.getDate());
                    this.refresh.next();
                  }
                });
              }
              }
            }
          });
        }
      });
    }

    eventClicked({ event }: { event: CalendarEvent }): void {
      if (event.title !== 'FOGLALT') {
        console.log("foglalás", event.start)
        this.requests.reserveSlot({
          name: "Teszt Név",
          phone: 12344124,
          email: "tesztemail",
          slot_time: event.start.getHours() - 8,
          slot_date: event.start.getFullYear().toString() + "-" + (event.start.getMonth() + 1).toString() + "-" + event.start.getDate()
        }).subscribe(data =>{
         this.loadInData();
        }, err => {
          console.log(err);
        });
      }
    }

    generateCalendar() {
      const currDate = new Date();
      const startDay = currDate.getDate() - currDate.getDay();
      const endDay = currDate.getDate() + (5 - currDate.getDay());

      let day = startDay;

      while(day < endDay) {
        day++;
        this.hours.forEach(el => {
          const date = moment(currDate);
          date.set("date", day);
          date.hour(el);
          date.minute(0);
          date.second(0);
          this.events.push(
            {
              title: 'Foglalás',
              color: {
                primary: '#89F029',
                secondary: '#41E627'
              },
              start: moment(date).toDate()
            },
          )
        })
      }
    }
}
