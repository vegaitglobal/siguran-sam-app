import {createClient} from "contentful";
import {ContentService} from "./content.interfaces";

class ContentfulContentService implements ContentService {
    private readonly baseURL: string = "";
    private client: any;

    constructor(spaceID: string | undefined, accessToken: string | undefined) {
        this.baseURL = `https://cdn.contentful.com/spaces/${spaceID}/entries?access_token=${accessToken}`;

        if (!spaceID || !accessToken) {
            console.error("Space ID or Access Token is not defined");
            process.exit(1); // Exit the script or handle the error as needed
        }

        this.client = createClient({
            space: spaceID,
            accessToken: accessToken,
        });
    }

    async GetCategories(): Promise<Category[]> {
        const url = `${this.baseURL}&content_type=category`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        try {
            const data = await response.json();

            return data.items.map((item: any) => ({
                id: item.sys.id,
                title: item.fields.title,
                description: item.fields.description,
                iconURL: item.fields.icon.sys.id,
            }));
        } catch (error) {
            console.error('Error getting categories:', error);
            throw error;
        }
    }

    async GetBlogPosts(categoryID: string): Promise<BlogPost[]> {
        const url = `${this.baseURL}&content_type=blogPost&fields.category.sys.id=${categoryID}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        try {
            const data = await response.json();

            return data.items.map((blogPostItem: any) => {
                console.table(blogPostItem);
                const blogPostContent: BlogPostContent[] = blogPostItem.fields.content.content.map((richContentItem: any) => {
                    const contentValue = richContentItem.content.map((contentData: any) => contentData.value);

                    return {
                        type: richContentItem.nodeType,
                        values: contentValue,
                    };
                });

                return {
                    id: blogPostItem.sys.id,
                    title: blogPostItem.fields.title,
                    categoryId: blogPostItem.fields.category.sys.id,
                    heroImageURL: blogPostItem.fields.heroImage.sys.id,
                    thumbnailURL: blogPostItem.fields.heroImage.sys.id,
                    content: blogPostContent,
                };
            });
        } catch (error) {
            console.error('Error getting blog posts by category:', error);
            throw error;
        }
    }

    async GetAsset(assetID: string): Promise<Asset> {
        const asset = await this.client.getAsset(assetID);
        const file = asset.fields.file;
        if (!file) {
            throw new Error("Asset does not have a file");
        }

        try {
            if (file.contentType.startsWith("image/")) {
                return {
                    assetURL: file.url,
                    assetType: AssetType.IMAGE
                };
            } else if (file.contentType.startsWith("video/")) {
                return {
                    assetURL: file.url,
                    assetType: AssetType.VIDEO
                };
            }
            else {
                console.log("Asset is not an image or a video.");
                throw new Error("Asset is not an image or a video.");
            }
        } catch (error) {
            console.error('Error fetching asset:', error);
            throw error;
        }
    }
}

export default new ContentfulContentService(process.env.EXPO_PUBLIC_CONTENTFUL_SPACE_ID, process.env.EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN);