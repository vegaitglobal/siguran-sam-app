import * as Contentful from 'contentful';
import { ContentService } from './content.interfaces';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';

type CategoryEntrySkeleton = {
  contentTypeId: 'category';
  fields: {
    title: Contentful.EntryFieldTypes.Text;
    description: Contentful.EntryFieldTypes.Text;
    icon: Contentful.EntryFieldTypes.AssetLink;
  };
};

type BlogPostEntrySkeleton = {
  contentTypeId: 'blogPost';
  fields: {
    title: Contentful.EntryFieldTypes.Text;
    heroImage: Contentful.EntryFieldTypes.AssetLink;
    category: Contentful.EntryFieldTypes.EntryLink<CategoryEntrySkeleton>;
    content: Contentful.EntryFieldTypes.RichText;
  };
};

class ContentfulContentService implements ContentService {
  private client: Contentful.ContentfulClientApi<undefined>;
  constructor(spaceID: string, accessToken: string) {
    this.client = Contentful.createClient({
      space: spaceID,
      accessToken,
    });
  }

  async getCategories() {
    const data = await this.client.getEntries<CategoryEntrySkeleton>({
      content_type: 'category',
      include: 1,
    });

    return data.items.map((item) => {
      const icon = item.fields.icon as Contentful.Asset;
      return {
        id: item.sys.id,
        title: item.fields.title,
        description: item.fields.description,
        iconURL: icon.fields.file?.url as string,
      };
    });
  }

  async getBlogPosts(categoryID: string) {
    const data = await this.client.getEntries<BlogPostEntrySkeleton>({
      content_type: 'blogPost',
      include: 1,
      'fields.category.sys.id': categoryID,
    });

    return data.items.map((item) => {
      const category = item.fields.category as Contentful.Entry<CategoryEntrySkeleton>;
      const image = item.fields.heroImage as Contentful.Asset;

      return {
        id: item.sys.id,
        title: item.fields.title,
        category: category.fields.title as string,
        heroImageURL: image.fields.file?.url as string,
        thumbnailURL: image.fields.file?.url as string,
        content: documentToHtmlString(item.fields.content as Document),
      };
    });
  }
}

const [spaceId, accessToken] = [
  process.env.EXPO_PUBLIC_CONTENTFUL_SPACE_ID,
  process.env.EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
];

if (!spaceId) throw Error('Contentful Space ID not found');
if (!accessToken) throw Error('Contentful Access Token not found');

export default new ContentfulContentService(spaceId, accessToken);
