import { ContentfulClientApi, createClient } from 'contentful';
import { ContentService } from './content.interfaces';

class ContentfulContentService implements ContentService {
	private client: ContentfulClientApi<undefined>;
	constructor(
		private readonly spaceID: string,
		private readonly accessToken: string
	) {
		this.client = createClient({
			space: spaceID,
			accessToken,
		});
	}

	async GetCategories(): Promise<Category[]> {
		const data = await this.client.getEntries({
			content_type: 'category',
			include: 1,
		});

		console.log(data.items[0]);

		return [];

		// return data.items.map((item) => ({
		// 	id: item.sys.id,
		// 	title: item.fields.title,
		// 	description: item.fields.description,
		// 	iconURL: item.fields.icon.sys.id,
		// }));
	}

	async GetBlogPosts(categoryID: string): Promise<BlogPost[]> {
		const data = await this.client.getEntries({ content_type: 'blogPost' });

		console.log(data.items[0]);

		return [];

		// const blogPostContent: BlogPostContent[] =
		// 	blogPostItem.fields.content.content.map((richContentItem: any) => {
		// 		const contentValue = richContentItem.content.map(
		// 			(contentData: any) => contentData.value
		// 		);

		// 		return {
		// 			type: richContentItem.nodeType,
		// 			values: contentValue,
		// 		};
		// 	});

		// return {
		// 	id: blogPostItem.sys.id,
		// 	title: blogPostItem.fields.title,
		// 	categoryId: blogPostItem.fields.category.sys.id,
		// 	heroImageURL: blogPostItem.fields.heroImage.sys.id,
		// 	thumbnailURL: blogPostItem.fields.heroImage.sys.id,
		// 	content: blogPostContent,
		// };
	}

	async GetAsset(assetID: string): Promise<Asset> {
		const asset = await this.client.getAsset(assetID);
		const file = asset.fields.file;
		if (!file) {
			throw new Error('Asset does not have a file');
		}

		try {
			if (file.contentType.startsWith('image/')) {
				return {
					assetURL: file.url,
					assetType: AssetType.IMAGE,
				};
			} else if (file.contentType.startsWith('video/')) {
				return {
					assetURL: file.url,
					assetType: AssetType.VIDEO,
				};
			} else {
				console.log('Asset is not an image or a video.');
				throw new Error('Asset is not an image or a video.');
			}
		} catch (error) {
			console.error('Error fetching asset:', error);
			throw error;
		}
	}
}

const [spaceId, accessToken] = [
	process.env.EXPO_PUBLIC_CONTENTFUL_SPACE_ID,
	process.env.EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
];

if (!spaceId) throw Error('Contentful Space ID not found');
if (!accessToken) throw Error('Contentful Access Token not found');

export default new ContentfulContentService(spaceId, accessToken);
