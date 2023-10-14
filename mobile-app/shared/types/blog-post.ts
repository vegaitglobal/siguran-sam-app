import {BlogPostContent} from "./blog-post-content";

export interface BlogPost {
    id: string;
    title: string;
    categoryID: string;
    heroImageURL: string;
    thumbnailURL: string; // TODO convert hero image to thumbnail locally / upload separate thumbnail on contentful

    // One blog post content object holds a single html element (h2, p, img, video)
    content: BlogPostContent[];
}