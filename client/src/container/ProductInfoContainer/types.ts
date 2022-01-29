interface ProductInfoType {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  productOptions: {
    created_at: string;
    id: number;
    name: string;
    price: number;
    stock: number;
    updated_at: string;
  }[];
}

interface CartType {
  id: number;
  name: string;
  productId: number;
  price: number;
  stock: number;
  quantity: number;
}

interface SelectedType {
  [key: string]: CartType;
}

export { ProductInfoType, SelectedType, CartType };
