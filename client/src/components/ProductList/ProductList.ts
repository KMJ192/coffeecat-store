import { useRedirection } from '@router';
import { ProductType } from '@src/container/ProductListContainer/types';

import { priceFormat } from '@src/util';

import classNames from 'classnames/bind';
import style from './ProductList.module.scss';
const cx = classNames.bind(style);

interface Props {
  productList: ProductType[];
}

function ProductList({ productList }: Props) {
  return {
    tagName: 'div',
    props: {
      className: cx('ProductListPage'),
    },
    childNode: [
      {
        tagName: 'h1',
        childNode: '상품 목록',
      },
      {
        tagName: 'ul',
        childNode:
          productList &&
          productList.map((product: ProductType) => {
            const { id, name, price, imageUrl } = product;
            return {
              tagName: 'li',
              childNode: `
                <img src='${imageUrl}'></img>
                <div class='Product__info'>
                  <div>${name}</div>
                  <div>${priceFormat(price)}원 ~</div>
                </div>
              `,
              props: {
                className: 'Product',
              },
              event: {
                type: 'click',
                eventFunc: () => {
                  useRedirection(`/web/products/${id}`);
                },
              },
            };
          }),
      },
    ],
  };
}

export default ProductList;
