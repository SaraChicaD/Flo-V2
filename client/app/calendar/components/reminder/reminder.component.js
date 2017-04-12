import { AfterViewInit, Component, ViewChildren, Renderer } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';
// import { StorageService } from '../../../auth/services/storage/storage.service';
import template from './reminder.template.html';
import moment from 'moment-timezone';

@Component({
  selector: 'reminder',
  template: template
})

export class ReminderComponent implements AfterViewInit {

  constructor(router: Router, renderer: Renderer) {
    this._router = router;
    this.now = false;
    this.dates = {
    	numDays: 7, 
    }
  }

  onNumChange(numDays) {
    console.log('numDays changed', numDays);
    //format for Google API: 2017-04-17T12:00:00Z
    //moment('2016-03-12 13:00:00').add(1, 'day').format('LLL')
    //^^ take estimated start date, add numDays to it, then format && create a calendar event
  }

  //TODO we want to take an input #, turn it into a moment.js #
  //create an event that will be the # of days out of the input #

  // createEvent() {

  //   console.log('creating event');

  //   let event = {
  //     'summary': 'Period #MyFlo',
  //     'location': 'Wherever I am',
  //     'description': 'bleeding all day',
  //     'start': {
  //       // 'dateTime': this.dates.minDate.format(),
  //       'dateTime': moment.utc(this.dates.minDate).format(),
  //     },
  //     'end': {
  //       // 'dateTime': this.dates.maxDate.format(),
  //       'dateTime': moment.utc(this.dates.maxDate).format(),
  //     },
  //     'reminders': {
  //       'useDefault': false,
  //       'overrides': [
  //         {'method': 'email', 'minutes': 24 * 60},
  //         {'method': 'popup', 'minutes': 10}
  //       ]
  //     }
  //   }

  //   gapi.client.load('calendar', 'v3', () => {
			
  //     let request = gapi.client.calendar.calendarList.list();

		// 	request.execute((resp) => {
  //       console.log('resp', resp);
		// 		// Check if Flo is present, else create it
		// 		let floCal = resp.items.find((item) => {
		// 			return item.summary === 'Flo';
		// 		});

  //       if(floCal){
  //         let floId = floCal.id;
  //         let request = gapi.client.calendar.events.insert({
  //          'calendarId': floId,
  //          'resource': event
  //         });
  //         console.log('event 117', event);

  //         request.execute((event) => {
  //           // $('.event').append('Event created: ' + event.htmlLink);
  //           console.log('event 121', event);
  //         });

  //       } else {
  //         //TODO: when creating this, doesn't add event ALSO
  //         //either adds event to existing, or adds calendar
  //         //but should add calendar && add event

  //         let request = gapi.client.calendar.calendars.insert({
  //           'summary': 'Flo',
  //           //maybe get this dynamically
  //           'time_zone': 'America/Los_Angeles'
  //         });

  //         request.execute((event) => {
  //           // $('.event').append('Event created: ' + event.htmlLink);
  //           console.log('event', event);
  //         });
  //       }        

		// 	});

  //   });
  // }


	
}
