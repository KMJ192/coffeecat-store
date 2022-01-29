import { useRedirection } from '@router/Router';

import { SelectedProduct } from '@src/container/CartContainer/types';

import { priceFormat } from '@src/util';

import classNames from 'classnames/bind';
import style from './Cart.module.scss';
const cx = classNames.bind(style);

interface Props {
  cartProduct: SelectedProduct[];
  totalPrice: number;
}

function Cart({ cartProduct, totalPrice }: Props) {
  return {
    tagName: 'div',
    props: {
      className: cx('CartPage'),
    },
    childNode: [
      {
        tagName: 'h1',
        childNode: '장바구니',
      },
      {
        tagName: 'div',
        props: {
          className: cx('Cart'),
        },
        childNode: [
          {
            tagName: 'ul',
            childNode: [
              ...cartProduct.map((product: SelectedProduct) => {
                const { imageUrl, name, price, optionName, quantity } = product;
                return {
                  tagName: 'li',
                  props: {
                    className: cx('Cart__item'),
                  },
                  childNode: [
                    {
                      tagName: 'img',
                      props: {
                        src: imageUrl,
                        alt: `${name} 이미지`,
                      },
                    },
                    {
                      tagName: 'div',
                      props: {
                        className: cx('Cart__itemDesription'),
                      },
                      childNode: [
                        {
                          tagName: 'div',
                          childNode: `${name} ${optionName} ${quantity}개`,
                        },
                        {
                          tagName: 'div',
                          childNode: `${priceFormat(price * quantity)}원`,
                        },
                      ],
                    },
                  ],
                };
              }),
            ],
          },
          {
            tagName: 'div',
            props: {
              className: cx('Cart__totalPrice'),
            },
            childNode: `총 상품가격 ${priceFormat(totalPrice)}원`,
          },
          {
            tagName: 'button',
            props: {
              className: cx('OrderButton'),
            },
            event: [
              {
                type: 'click',
                eventFunc: () => {
                  alert('주문되었습니다.');
                  localStorage.clear();
                  useRedirection('/');
                },
              },
            ],
            childNode: '주문하기',
          },
        ],
      },
    ],
  };
}

export default Cart;
