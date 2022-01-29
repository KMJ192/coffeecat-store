import { useState, useEffect } from '@react';
import { useRequest } from '@api';

import ProductList from '@src/components/ProductList';

import { ProductType } from './types';

function ProductListContainer() {
  const [productList, setProductList] = useState([]);

  const getProductList = async () => {
    const pl: ProductType[] = await useRequest(`/product-list`);
    setProductList(pl);
  };

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  return ProductList({ productList });
}

export default ProductListContainer;
