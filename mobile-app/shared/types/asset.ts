export enum AssetType {
    IMAGE = "image",
    VIDEO = "video"
}
export interface Asset {
    assetURL: string,
    assetType: AssetType
}