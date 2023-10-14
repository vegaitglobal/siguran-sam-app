enum AssetType {
    IMAGE = "image",
    VIDEO = "video"
}
interface Asset {
    assetURL: string,
    assetType: AssetType
}