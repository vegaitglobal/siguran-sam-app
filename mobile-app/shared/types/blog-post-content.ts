export enum ElementType {
    HEADING_2 = "heading-2",
    NORMAL_TEXT = "paragraph",
    ASSET = "embedded-asset-block"
}

export interface BlogPostContent {
    type: ElementType;
    values: string[]; // Text has one value (but contentful returns an array), assets have no value
}