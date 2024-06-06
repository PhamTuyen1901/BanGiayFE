export interface Product {
  productId: number;
  productTmName: string;
  styleId: number;
  productName: string;
  productImage: string;
  productStatus: number;
  productPrice: string;
  productQuantity: number;
  productSoldQt: number;
  productInfor: string;
  productIntro: string;
  productDiscount: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface Bill {
  billId: number;
  productId: number;
  userId: number;
  quantityPurchased: number;
  DatePurchase: string;
  Purchased: string;
  created_at: string | null;
  updated_at: string | null;
  products: Product;
}
export interface UserProfile {
  userId: number;
  userName: string;
  userAvt: string;
  userPhoneNumber: string;
  userAddress: string;
  userEmail: string;
  userRole: number;
  google_id: string | null;
  profile_photo_url: string;
}
