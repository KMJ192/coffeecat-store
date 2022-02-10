import { useState, useEffect, useDocument } from '@react/React';
import { useParam } from '@router';
import { useRequest } from '@api';

import ProductInfo from '@src/components/ProductInfo';

import { CartType, ProductInfoType, SelectedType } from './types';

function ProductInfoContainer() {
  const { id } = useParam();
  const [totalPrice, setTotalPrice] = useState(0);
  const [productInfo, setProductInfo] = useState<ProductInfoType>();
  const [selectedProduct, setSelectedProduct] = useState<SelectedType>();
  const [recentlySelect, setRecentlySelect] = useState<number>();

  const total = (selected: {
    [key: string]: { price: number; quantity: number };
  }) => {
    let hap = 0;
    Object.keys(selected).forEach((key: string) => {
      const { price, quantity } = selected[key];
      hap += price * quantity;
    });
    setTotalPrice(hap);
  };

  const selectHandler = (idx: number) => {
    if (idx === 0) return;
    if (productInfo) {
      const {
        id: productId,
        name,
        price,
        stock,
      } = productInfo.productOptions[idx - 1];
      const select = {
        [String(productId)]: {
          id: Number(id),
          productId,
          name,
          price: price + productInfo.price,
          stock,
          quantity: 1,
        },
      };
      const selected = {
        ...selectedProduct,
        ...select,
      };
      setRecentlySelect(productId);
      setSelectedProduct(selected);

      total(selected);
    }
  };

  const setCnt = (inputCnt: number, productId: string) => {
    if (selectedProduct) {
      let quantity = 0;
      if (selectedProduct[productId].stock < inputCnt) {
        quantity = selectedProduct[productId].stock;
      } else {
        quantity = inputCnt;
      }
      const selected = {
        ...selectedProduct,
        [productId]: {
          ...selectedProduct[productId],
          quantity,
        },
      };
      setSelectedProduct(selected);

      total(selected);
    }
  };

  const saveStorage = () => {
    if (selectedProduct) {
      let selected: CartType[] = [];
      Object.keys(selectedProduct).forEach((key: string) => {
        selected = [...selected, ...[selectedProduct[key]]];
      });
      try {
        const data = localStorage.getItem('products_cart');
        if (data) {
          selected = [...selected, ...JSON.parse(data)];
        }
      } catch (e) {
        console.error(`local storage getItem error ${e}`);
      }
      try {
        localStorage.setItem('products_cart', JSON.stringify(selected));
      } catch (e) {
        console.error(`local storage setItem error ${e}`);
      }
    }
  };

  const getProductInfo = async () => {
    const pi = await useRequest(`/product/${id}`);
    setProductInfo(pi);
  };

  useEffect(() => {
    getProductInfo();
  }, []);

  return ProductInfo({
    selectedProduct,
    totalPrice,
    recentlySelect,
    productInfo,
    selectHandler,
    setCnt,
    saveStorage,
  });
}

export default ProductInfoContainer;
