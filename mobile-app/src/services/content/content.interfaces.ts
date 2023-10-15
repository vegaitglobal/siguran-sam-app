export interface Category {
	id: string;
	title: string;
	description: string;
	iconURL: string;
}

interface BlogPost {
	id: string;
	title: string;
	category: string;
	heroImageURL: string;
	thumbnailURL: string;
}

export interface ContentService {
	getCategories: () => Promise<Category[]>;
	getBlogPosts: (categoryID: string) => Promise<BlogPost[]>;
}
