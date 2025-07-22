export interface CreateAuctionRequest {
  productName: string;
  description: string;
  thumbnailUrl: string;
  imageUrls: string[];
  categoryId: number;
  address: string;
  addressDetail: string;
  zipCode: string;
  phone: string;
  startDate: string;
  bidPeriod: string;
  startingPrice: number;
  buyNowPrice: number;
}
