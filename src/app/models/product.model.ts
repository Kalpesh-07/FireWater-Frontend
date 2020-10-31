
export interface ProductModelServer {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  p_cat_id: number;
  category: string;
}

export interface ServerResponse {
  products: ProductModelServer[];
}