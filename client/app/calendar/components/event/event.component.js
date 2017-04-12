import { AfterViewInit, Component, ViewChildren, Renderer } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
// import { StorageService } from '../../../auth/services/storage/storage.service';
import template from './event.template.html';
import moment from 'moment-timezone';

@Component({
  selector: 'event',
  template: template
})

export class EventComponent implements AfterViewInit {

  constructor(router: Router, renderer: Renderer) {
    this._router = router;
    this.now = false;
    this.dates = {
      minDate: moment.tz().hour(12).startOf('h'), //12:00 User Timezone, today.
      maxDate: moment.tz().add(5, 'd').hour(12).startOf('h'), //12:00 User Timezone, in five days.
    }
  }

  @ViewChildren('datepicker') input;

  ngAfterViewInit() {
    // testCalendar()
    // let endDate = new Flatpickr(this.input.nativeElement);

    for (var i of this.input) {
      new Flatpickr(i.nativeElement)
    }
  }

  testCalendar() {
      gapi.client.load('calendar', 'v3', function() {
          let request = gapi.client.calendar.calendarList.list();
          request.execute((resp) => {
              console.log('resp', resp);
              resp.items.forEach((item) => {
                  console.log(item.id);
              });


              request.execute((resp) => {
                  let flo = resp.items.filter((item) => {
                    return item.summary === 'Flo';
                  })

                  console.log('flo', flo);
              });
          });
          let request1 = gapi.client.calendar.events.list({
              'calendarId': 'primary',
              'timeMin': '2015-12-23T04:26:52.000Z'//Suppose that you want get data after 23 Dec 2014
           });
          request1.execute((resp) => {
            resp.items.forEach((item) => {
                console.log(item.id);
            });
          });
      });
  }

  onStartDateChange(startDate) {
    console.log('start date changed', startDate);
    this.dates.minDate = startDate;
  }

  onEndDateChange(endDate) {
    console.log('end date changed', endDate);
    this.dates.maxDate = endDate;
  }

  createEvent() {
    //TODO could probably move this somewhere else but sara isn't super sure
    //how to import/export/pass vars around in angular2
    let userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log(userTimezone, 'userTimezone');

    // console.log('creating event');

    let event = {
      'summary': 'Flo',
      'location': 'My body',
      'description': '#MyFlo #FloLife',
      'start': {
        'dateTime': moment.utc(this.dates.minDate).format(),
      },
      'end': {
        'dateTime': moment.utc(this.dates.maxDate).format(),
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    }

    // Check if Flo is present, else create it
    gapi.client.load('calendar', 'v3', () => {
      
      let request = gapi.client.calendar.calendarList.list();

      request.execute((resp) => {
        // console.log('resp', resp);
        let floCal = resp.items.find((item) => {
          return item.summary === 'Flo';
        });
        //add event to Flo calendar
        if(floCal){
          let floId = floCal.id;
          let request = gapi.client.calendar.events.insert({
           'calendarId': floId,
           'resource': event
          });

          request.execute((event) => {});
        //create Flo calendar
        } else {

          let request = gapi.client.calendar.calendars.insert({
            'summary': 'Flo',
            // get this dynamically
            'time_zone': userTimezone
          });

          request.execute((event) => {
            //TODO called this again to then CREATE the event after 
            //the calendar, needs refactor, too brute
            this.createEvent();
          });
        }        

      });

    });
  }

  onDateRangeChanged(event:any) {
      console.log('onDateRangeChanged(): Begin date: ', event.beginDate, ' End date: ', event.endDate);
      console.log('onDateRangeChanged(): Formatted: ', event.formatted);
      console.log('onDateRangeChanged(): BeginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
    }

}
