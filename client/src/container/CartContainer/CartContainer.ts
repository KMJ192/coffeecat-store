import { useState, useEffect } from '@react';
import { useRedirection } from '@router';
import { useRequest } from '@api';

import Cart from '@src/components/Cart';

import { CartType, ProductResponseType } from './types';

function CartContainer() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProduct, setCartProduct] = useState([]);

  const getItems = async () => {
    const storage = localStorage.getItem('products_cart');
    if (!storage) return;

    const cartData: CartType[] = JSON.parse(storage);
    let hap = 0;
    const products = await Promise.all(
      cartData.map(async (prod: CartType) => {
        let selectedProduct = {};
        const { id, productId, price, quantity } = prod;
        const response: ProductResponseType = await useRequest(
          `/product/${id}`,
        );
        const { productOptions, imageUrl, name } = response;
        productOptions.forEach((options) => {
          if (options.id === productId) {
            hap += price * quantity;
            selectedProduct = {
              ...selectedProduct,
              ...{
                imageUrl,
                name,
                price,
                quantity,
                optionName: options.name,
              },
            };
          }
        });
        return selectedProduct;
      }),
    );
    setTotalPrice(hap);
    if (products) setCartProduct(products);
  };

  useEffect(() => {
    const cartData = localStorage.getItem('products_cart');
    if (cartData === null) {
      alert('장바구니가 비어있습니다.');
      useRedirection('/');
    } else {
      getItems();
    }
  }, []);

  return Cart({ cartProduct, totalPrice });
}

export default CartContainer;
