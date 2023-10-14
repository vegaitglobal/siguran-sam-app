import { ApplicationEvent, TrackingService,EventType } from './tracking.interfaces';

class NewRelicTrackingService implements TrackingService {
	constructor() {
		
	}

	public track(event: ApplicationEvent) {
		const newrelic = require('newrelic');
		var eventToBeSent;//ne znam da li je dobro ime
		switch(event.event){
			case EventType.ApplicationOpened, EventType.OnboardingFinished:
				eventToBeSent = {
					eventType: 'CustomEvent',
					eventName: event.event,
					deviceId: event.deviceId
				};
				break;
			case EventType.ContactAdded, EventType.ContactRemoved:
				eventToBeSent = {
					eventType: 'CustomEvent',
					eventName: event.event,
					deviceId: event.deviceId,
					totalContacts:event.totalContacts
				};
				break;
			case EventType.EmergencyRequested:
				eventToBeSent = {
					eventType: 'CustomEvent',
					eventName: event.event,
					deviceId: event.deviceId,
					batteryPercentage:event.context.device.batteryPercentage,
					hasSignal:event.context.device.hasSignal?'Yes':'No',
					locationLongitude:event.context.location.longitude,
					locationLatitude:event.context.location.latitude,
					locationAltitude:event.context.location.altitude,
					locationTimestamp:event.context.location.timestamp,
					delayedFrom:event.delayedFrom,
					totalContacts:event.totalContacts
				};
				break;
		}
		newrelic.recordCustomEvent('CustomEventType', eventToBeSent);
		return Promise.resolve();
	}
}

var tracking=new NewRelicTrackingService();


tracking.track({event:EventType.ApplicationOpened,deviceId:'1'});
tracking.track({event:EventType.ApplicationOpened,deviceId:'2'});
tracking.track({event:EventType.ApplicationOpened,deviceId:'3'});
tracking.track({event:EventType.ApplicationOpened,deviceId:'4'});
tracking.track({event:EventType.ApplicationOpened,deviceId:'4'});
tracking.track({event:EventType.ApplicationOpened,deviceId:'4'});
tracking.track({event:EventType.ApplicationOpened,deviceId:'5'});
tracking.track({event:EventType.ApplicationOpened,deviceId:'6'});
tracking.track({event:EventType.ApplicationOpened,deviceId:'6'});
tracking.track({event:EventType.ApplicationOpened,deviceId:'2'});

tracking.track({event:EventType.OnboardingFinished,deviceId:'1'});
tracking.track({event:EventType.OnboardingFinished,deviceId:'2'});
tracking.track({event:EventType.OnboardingFinished,deviceId:'3'});
tracking.track({event:EventType.OnboardingFinished,deviceId:'4'});
tracking.track({event:EventType.OnboardingFinished,deviceId:'5'});
tracking.track({event:EventType.OnboardingFinished,deviceId:'6'});

tracking.track({event:EventType.ContactAdded,deviceId:'1',totalContacts:3});
tracking.track({event:EventType.ContactAdded,deviceId:'2',totalContacts:4});
tracking.track({event:EventType.ContactAdded,deviceId:'3',totalContacts:2});
tracking.track({event:EventType.ContactAdded,deviceId:'4',totalContacts:5});
tracking.track({event:EventType.ContactAdded,deviceId:'5',totalContacts:2});
tracking.track({event:EventType.ContactAdded,deviceId:'6',totalContacts:4});

tracking.track({event:EventType.ContactRemoved,deviceId:'1',totalContacts:2});
tracking.track({event:EventType.ContactRemoved,deviceId:'2',totalContacts:3});
tracking.track({event:EventType.ContactRemoved,deviceId:'3',totalContacts:1});
tracking.track({event:EventType.ContactRemoved,deviceId:'4',totalContacts:4});
tracking.track({event:EventType.ContactRemoved,deviceId:'5',totalContacts:1});
tracking.track({event:EventType.ContactRemoved,deviceId:'6',totalContacts:3});

tracking.track({event:EventType.EmergencyRequested,deviceId:'6',context:{device:{batteryPercentage:0.54,hasSignal:true,internetConnection:'cellular'},location:{altitude:52,longitude:40,latitude:25,timestamp:'vreme-lokacije1'}},totalContacts:5});
tracking.track({event:EventType.EmergencyRequested,deviceId:'2',context:{device:{batteryPercentage:0.24,hasSignal:true,internetConnection:'cellular'},location:{altitude:52,longitude:40,latitude:25,timestamp:'vreme-lokacije1'}},totalContacts:5});
tracking.track({event:EventType.EmergencyRequested,deviceId:'1',context:{device:{batteryPercentage:0.36,hasSignal:true,internetConnection:'cellular'},location:{altitude:52,longitude:40,latitude:25,timestamp:'vreme-lokacije1'}},totalContacts:5});
tracking.track({event:EventType.EmergencyRequested,deviceId:'3',context:{device:{batteryPercentage:0.09,hasSignal:true,internetConnection:'cellular'},location:{altitude:52,longitude:40,latitude:25,timestamp:'vreme-lokacije1'}},totalContacts:5});
tracking.track({event:EventType.EmergencyRequested,deviceId:'6',context:{device:{batteryPercentage:0.85,hasSignal:true,internetConnection:'cellular'},location:{altitude:52,longitude:40,latitude:25,timestamp:'vreme-lokacije1'}},totalContacts:5});
tracking.track({event:EventType.EmergencyRequested,deviceId:'4',context:{device:{batteryPercentage:0.65,hasSignal:true,internetConnection:'cellular'},location:{altitude:52,longitude:40,latitude:25,timestamp:'vreme-lokacije1'}},totalContacts:5});
tracking.track({event:EventType.EmergencyRequested,deviceId:'2',context:{device:{batteryPercentage:0.28,hasSignal:true,internetConnection:'cellular'},location:{altitude:52,longitude:40,latitude:25,timestamp:'vreme-lokacije1'}},totalContacts:5});






export default new NewRelicTrackingService();
