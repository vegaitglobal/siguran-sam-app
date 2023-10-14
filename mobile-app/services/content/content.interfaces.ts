export interface ContentService {
    GetCategories: () => Promise<Category[]>,
    GetBlogPosts: (categoryID: string) => Promise<BlogPost[]>,
    GetAsset: (assetID: string) => Promise<Asset>
}