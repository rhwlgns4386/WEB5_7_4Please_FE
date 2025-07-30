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
  // startDate: string;
  bidPeriod: string;
  startingPrice: number;
  buyNowPrice: number;
}

export interface S3UploadResponse {
  imageUrls: string[];
}

export interface Category {
  categoryId: number;
  name: string;
}

export interface SellerInfo {
  sellerId: number;
  sellerNickname: string;
  totalReviews: number;
  averageRating: number;
  completedDeals: number;
  createdAt: string;
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

export interface MemberInfo {
  totalReviews: number;
  averageRating: number;
  nickname: string;
}

export interface MyAuction {
  auctionId: number;
  thumbnailUrl: string;
  category: {
    categoryId: number;
    name: string;
  };
  name: string;
  instantPrice: number;
  endTime: string;
  maxPrice: number;
  bidCount: number;
  bidId: number;
  bidderName: string;
  paymentDeadline: string;
  createdAt: string;
  status: BiddingStatus;
}
export interface MyAuctionList {
  content: MyAuction[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export type BiddingStatus =
  | 'OPEN'
  | 'CLOSE'
  | 'FAIL'
  | 'PENDING'
  | 'SUCCESS'
  | 'REJECTED'
  | 'INTRANSIT'
  | 'DELIVERED';

export interface MyBid {
  auctionId: number;
  bidId: number;
  thumbnailUrl: string;
  product: string;
  status: BiddingStatus;
  startBidPrice: number;
  highestBidPrice: number;
  instantBidPrice: number;
  myBidPrice: number;
  bidTime: string;
  paymentDeadline: string;
  sellerNickName: string;
}
export interface MyBidList {
  content: MyBid[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
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
  sort?: string[];
}

export interface SaleContent {
  auctionId: number;
  thumbnailUrl: string;
  name: string;
  maxPrice: number;
  startBidPrice: number;
  description: string;
  bidCount: number;
  status: string;
}

export interface SaleList {
  content: SaleContent[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
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

export interface SigninResponse {
  message: string;
  accessToken: string;
  redirectUrl: string;
}

export type SigninType = 'google' | 'naver';

export interface ProductDetail {
  auctionId: number;
  highestBidPrice: number;
  instantBidPrice: number;
  bidCount: number;
  startingPrice: number;
  productName: string;
  categoryId: number;
  categoryName: string;
  description: string;
  endTime: string;
  thumbnailUrl: string;
  imageUrls: string[];
  isWishList: boolean;
}

export interface WishListContent {
  wishlistId: number;
  auctionId: number;
  thumbnailUrl: string;
  name: string;
  maxPrice: number;
  bidCount: number;
  createdAt: string;
}

export interface WishList {
  content: WishListContent[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface BidList {
  content: Bid[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
}

export interface Bid {
  auctionId: number;
  bidId: number;
  memberId: number;
  bidderName: string;
  bidPrice: number;
  bidTime: string;
  isSuccessfulBidder: boolean;
}

//FIXME: 알림 리스트 타입 수정해야함.
export interface NotificationList {
  content: {
    notificationId: number;
    message: string;
    createdAt: string;
    isRead: boolean;
  }[];
  page: number;
  totalPages: number;
}

export interface NotificationFive {
  pushNotificationResponses: {
    id: number;
    isRead: boolean;
    type: string;
    data: Record<string, string>;
  }[];
}

export interface Order {
  imageUrl: string;
  productName: string;
  deliveryRequest: string;
  recipient: string;
  sellerName: string;
  address: string;
  addressDetail: string;
  zipCode: string;
  phone: string;
  price: number;
}

export interface OrderUpdateRequest {
  address: string;
  addressDetail: string;
  zipCode: string;
  phone: string;
  content: string;
  receiver: string;
}

export interface Shipment {
  shipmentId: number;
  auctionId: number;
  address: string;
  addressDetail: string;
  zipCode: string;
  phone: string;
  content: string;
  receiver: string;
}

export interface Payment {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export interface SocialLoginResponse {
  redirect: string;
}
