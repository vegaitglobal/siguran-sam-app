import {createClient} from "contentful";
import {Category} from "../shared/types/category";
import {BlogPost} from "../shared/types/blog-post";
import {BlogPostContent} from "../shared/types/blog-post-content";
import {Asset, AssetType} from "../shared/types/asset";

const spaceID = process.env.EXPO_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const baseURL = `https://cdn.contentful.com/spaces/${spaceID}/entries?access_token=${accessToken}`;

if (!spaceID || !accessToken) {
    console.error("Space ID or Access Token is not defined");
    process.exit(1); // Exit the script or handle the error as needed
}
const client = createClient({
    space: spaceID,
    accessToken: accessToken,
});

export async function GetCategories(): Promise<Category[]> {
    const url = `${baseURL}&content_type=category`;
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

interface GetBlogPostsProps {
    categoryID: string;
}
export async function GetBlogPosts({categoryID}: GetBlogPostsProps) {
    const url = `${baseURL}&content_type=blogPost&fields.category.sys.id=${categoryID}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    try {
        const data = await response.json();

        const blogPosts: BlogPost[] = data.items.map((blogPostItem: any) => {
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

        return blogPosts;
    } catch (error) {
        console.error('Error getting blog posts by category:', error);
        throw error;
    }
}

interface GetAssetProps {
    assetID: string
}
export async function GetAssetURL({assetID}: GetAssetProps): Promise<Asset> {
    const asset = await client.getAsset(assetID);
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