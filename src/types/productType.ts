export type ProductType = {
    id: number;
    title: string;
    slug?: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    createdAt?: string;
    updatedAt?: string;
}

export type Category = {
    id: number;
    name: string;
    slug: string;
    image: string;
    cratedAt: string;
    updatedAt: string;
}

export type CartItems = {
    id: number;
    title: string;
    slug?: string;
    price: number;
    description: string;
    category?: Category;
    images: string[];
    createdAt?: string;
    updatedAt?: string;
    quantity: number;
}

export type ProductDetailType = {
   id: number;
    title: string;
    slug?: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    createdAt?: string;
    updatedAt?: string;
}
    
export type Reviews = {
    rating: number;
    comment: string;
    date: number;
    recieverName: string;
    reviewerEmail: string;
}