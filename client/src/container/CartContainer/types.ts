interface CartType {
  id: number;
  name: string;
  price: number;
  productId: number;
  stock: number;
  quantity: number;
}

interface StorageProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
}

interface SelectedProduct {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  optionName: string;
}

interface ProductResponseType {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  productOptions: StorageProduct[];
}

export { CartType, SelectedProduct, StorageProduct, ProductResponseType };
