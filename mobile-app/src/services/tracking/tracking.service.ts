import { ApplicationEvent, TrackingService } from './tracking.interfaces';

class NewRelicTrackingService implements TrackingService {
	constructor() {}

	public track(event: ApplicationEvent) {
		return Promise.resolve();
	}
}

export default new NewRelicTrackingService();
