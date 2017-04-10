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
    	minDate: moment.tz().hour(12).startOf('h'), //12:00 User Timezone, today.
    	// maxDate: moment.tz().add(5, 'd').hour(12).startOf('h'), //12:00 User Timezone, in five days.
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

  // testCalendar() {
  //     gapi.client.load('calendar', 'v3', function() {
  //         let request = gapi.client.calendar.calendarList.list();
  //         request.execute((resp) => {
  //             console.log('resp', resp);
  //             resp.items.forEach((item) => {
  //                 console.log(item.id);
  //             });


  //             request.execute((resp) => {
  //                 let flo = resp.items.filter((item) => {
  //                   return item.summary === 'Flo';
  //                 })

  //                 console.log('flo', flo);
  //             });
  //         });
  //         let request1 = gapi.client.calendar.events.list({
  //             'calendarId': 'primary',
  //             'timeMin': '2015-12-23T04:26:52.000Z'//Suppose that you want get data after 23 Dec 2014
  //          });
  //         request1.execute((resp) => {
  //           resp.items.forEach((item) => {
  //               console.log(item.id);
  //           });
  //         });
  //     });
  // }

  // onStartDateChange(startDate) {
  //   console.log('start date changed', startDate);
  //   this.dates.minDate = startDate;
  // }

  // onEndDateChange(endDate) {
  //   console.log('end date changed', endDate);
  //   this.dates.maxDate = endDate;
  // }

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

  // onDateRangeChanged(event:any) {
  //     console.log('onDateRangeChanged(): Begin date: ', event.beginDate, ' End date: ', event.endDate);
  //     console.log('onDateRangeChanged(): Formatted: ', event.formatted);
  //     console.log('onDateRangeChanged(): BeginEpoc timestamp: ', event.beginEpoc, ' - endEpoc timestamp: ', event.endEpoc);
  //   }

	// $scope.options = {
	// 	view: 'date',
	// 	format: 'lll',
	// 	maxView: false,
	// 	minView: 'hours',
	// };
  //
	// $scope.formats = [
	// 	 "MMMM YYYY",
	// 	 "DD MMM YYYY",
	// 	 "ddd MMM DD YYYY",
	// 	 "D MMM YYYY HH:mm",
	// 	 "lll",
	// ];
  //
	// $scope.views = ['year', 'month', 'date', 'hours', 'minutes'];
	// $scope.callbackState = 'Callback: Not fired';
  //
	// $scope.changeDate = function (modelName, newDate) {
	// 	console.log(modelName + ' has had a date change. New value is ' + newDate.format());
	// 	$scope.callbackState = 'Callback: Fired';
	// }
  //
	// $scope.changeData = function (type) {
	// 	var values = {},
	// 			pickersToUpdate = ['pickerRange'];
	// 	switch (type) {
	// 		case 'view':
	// 			values.view = $scope.options.view;
	// 			break;
	// 		case 'minView':
	// 			values.minView = $scope.options.minView;
	// 			break;
	// 		case 'maxView':
	// 			values.maxView = $scope.options.maxView;
	// 			break;
	// 		case 'format':
	// 			values.format = $scope.options.format;
	// 			break;
	// 	}
	// 	if (values) {
	// 		$scope.$broadcast('pickerUpdate', pickersToUpdate, values);
	// 	}
	// }
}
