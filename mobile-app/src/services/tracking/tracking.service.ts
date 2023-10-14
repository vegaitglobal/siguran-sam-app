// @ts-nocheck
import { createClient, ClientAPI } from 'contentful-management';
import { ApplicationEvent, TrackingService } from './tracking.interfaces';

class ContentfulTrackingService implements TrackingService {
	private client: ClientAPI;

	constructor(
		accessToken: string,
		private space: string
	) {
		this.client = createClient({
			accessToken,
			space,
		});
	}

	public async track(event: ApplicationEvent) {
		const { name, ...fields } = event;

		const environment = await this.client
			.getSpace(this.space)
			.then((space) => space.getEnvironment('master'));

		return environment.createEntry(name, {
			fields: Object.keys(fields).reduce(
				(acc: { [key: string]: any }, key: string) => {
					return (acc[key] = { 'en-US': fields[key] });
				},
				{}
			),
		});
	}
}

const [spaceId, accessToken] = [
	process.env.EXPO_PUBLIC_CONTENTFUL_SPACE_ID,
	process.env.EXPO_PUBLIC_CONTENTFUL_MANAGEMENT_API_KEY,
];

if (!spaceId) throw Error('Contentful Space ID not found');
if (!accessToken)
	throw Error('Contentful Management API key is not configured');

export default new ContentfulTrackingService(accessToken, spaceId);
