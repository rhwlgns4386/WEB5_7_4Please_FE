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

export interface Category {
  categoryId: number;
  name: string;
}

export interface AuctionItem {
  auctionId: number;
  thumbnailUrl: string;
  category: Category;
  name: string;
  maxPrice: number;
  instantPrice: number;
  bidCount: number;
  endTime: string;
  isWishlist: boolean;
}

export interface AuctionList {
  content: AuctionItem[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface ReviewItem {
  reviewId: number;
  nickName: string;
  rating: number;
  content: string;
  reviewTime: string;
}

export interface ReviewList {
  content: ReviewItem[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface Pageable {
  page: number;
  size: number;
  sort: string[];
}

export interface AuctionListRequest {
  page: number;
  size: number;
  keyword: string;
  categoryId: number | undefined;
  order: 'latest' | 'bids' | 'timeout' | string;
}

export interface SignupResponse {
  message: string;
  accessToken: string;
  redirectUrl: string;
}
