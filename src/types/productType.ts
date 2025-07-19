export type ProductList = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string;
}

export type ProductDetail = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    discountPercentage: number;
    reviews: Review[];
    category: string;
}
export type ProductListResponse = {
  products: ProductList[]; // Your array
  total: number;
  skip: number;
  limit: number;
};





export type Review = {
    id: number;
    rating: number;
    comment: string;
    date: number;
    receiverName: string;
    reviewerEmail: string;
}