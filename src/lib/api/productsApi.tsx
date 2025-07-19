
import { ProductListResponse ,ProductDetail} from '@/types/productType';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const productApi = createApi({
        reducerPath: 'productApi',
        baseQuery: fetchBaseQuery({ baseUrl:process.env.NEXT_PUBLIC_BASE_URL_API || 'https://dummyjson.com' }),
        tagTypes:["Product"],

        endpoints: (builder) => ({
            getProducts: builder.query<ProductListResponse, void>({
                query: () => "/products",
                providesTags: ["Product"],
            }),
            getProductById: builder.query<ProductDetail, number>({
                query: (id) => `/products/${id}`,
                providesTags: (result, error, id) => [{ type: 'Product', id }]
            }), 
        })
})
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productApi;
