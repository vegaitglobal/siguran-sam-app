import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Document } from '@contentful/rich-text-types';
import * as Contentful from 'contentful';
import { Logo } from 'src/services/content/content.interfaces';
import {
  ContactDetails,
  ContentService,
  EmergencyMessage,
  TermsAndConditions,
  WelcomeAnimation
} from './content.interfaces';

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

type TermsEntrySkeleton = {
  contentTypeId: 'termsAndConditions';
  fields: {
    title: Contentful.EntryFieldTypes.Text;
    content: Contentful.EntryFieldTypes.RichText;
  };
};

type ContactEntrySkeleton = {
  contentTypeId: 'contact';
  fields: {
    title: Contentful.EntryFieldTypes.Text;
    phoneNumber: Contentful.EntryFieldTypes.Text;
    website: Contentful.EntryFieldTypes.Text;
    email: Contentful.EntryFieldTypes.Text;
    instagram: Contentful.EntryFieldTypes.Text;
    facebook: Contentful.EntryFieldTypes.Text;
    twitter: Contentful.EntryFieldTypes.Text;
    linkedin: Contentful.EntryFieldTypes.Text;
  };
};

type EmergencyMessageEntrySkeleton = {
  contentTypeId: 'emergencyMessage';
  fields: {
    title: Contentful.EntryFieldTypes.Text;
    content: Contentful.EntryFieldTypes.Text;
  };
};

type LogoEntrySkeleton = {
  contentTypeId: 'logo';
  fields: {
    title: Contentful.EntryFieldTypes.Text;
    file: Contentful.EntryFieldTypes.AssetLink;
  };
};

type WelcomeAnimationEntrySkeleton = {
  contentTypeId: 'welcomeAnimation';
  fields: {
    title: Contentful.EntryFieldTypes.Text;
    file: Contentful.EntryFieldTypes.AssetLink;
    duration: Contentful.EntryFieldTypes.Number;
  };
};

const SVGType = 'image/svg+xml';

const prependUrl = (url: string) => url.startsWith('http') ? url : `http:${url}`;

const parseContentfulLogo = (logo: Contentful.Asset): Logo => {
  const { url, contentType } = logo.fields.file as Contentful.AssetFile;

  return {
    url: prependUrl(url),
    isSVG: contentType === SVGType,
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

  async getTermsAndConditions(): Promise<TermsAndConditions | undefined> {
    const data = await this.client.getEntries<TermsEntrySkeleton>({
      content_type: 'termsAndConditions',
      include: 1,
    });

    if (!data.items.length) return;

    // Taking only the first one as it is not supposed to have more than one instance of terms and conditions
    const item = data.items[0];

    return {
      content: documentToHtmlString(item.fields.content as Document),
    };
  }

  async getContactDetails(): Promise<ContactDetails | undefined> {
    const data = await this.client.getEntries<ContactEntrySkeleton>({
      content_type: 'contact',
      include: 1,
    });

    if (!data.items.length) return;

    // Taking only the first one as it is not supposed to have more than one instance of contact details
    const item = data.items[0];

    return item.fields;
  }

  async getEmergencyMessage(): Promise<EmergencyMessage | undefined> {
    const data = await this.client.getEntries<EmergencyMessageEntrySkeleton>({
      content_type: 'emergencyMessage',
      include: 1,
    });

    if (!data.items.length) return;

    // Taking only the first one as it is not supposed to have more than one instance of emergency message
    const item = data.items[0];

    return item.fields;
  }

  async getLogos(): Promise<Logo | undefined> {
    const data = await this.client.getEntries<LogoEntrySkeleton>({
      content_type: 'logo',
      include: 1,
    });

    if (!data.items.length) return;

    // Taking only the first one as it is not supposed to have more than one instance of logo
    const item = data.items[0];

    return parseContentfulLogo(item.fields.file as Contentful.Asset);
  }

  async getWelcomeAnimation(): Promise<WelcomeAnimation | undefined> {
    const data = await this.client.getEntries<WelcomeAnimationEntrySkeleton>({
      content_type: 'welcomeAnimation',
      include: 1,
    });

    if (!data.items.length) return;

    // Taking only the first one as it is not supposed to have more than one instance of welcome animation
    const {duration, file} = data.items[0].fields;

    return {
      url: prependUrl((file as Contentful.Asset).fields.file?.url as string),
      duration
    };
  }
}

const [spaceId, accessToken] = [
  process.env.EXPO_PUBLIC_CONTENTFUL_SPACE_ID,
  process.env.EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
];

if (!spaceId) throw Error('Contentful Space ID not found');
if (!accessToken) throw Error('Contentful Access Token not found');

export default new ContentfulContentService(spaceId, accessToken);
