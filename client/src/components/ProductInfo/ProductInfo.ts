import { useRedirection } from '@router';
import {
  ProductInfoType,
  SelectedType,
} from '@src/container/ProductInfoContainer/types';

import { priceFormat } from '@src/util';

import classNames from 'classnames/bind';
import style from './ProductInfo.module.scss';
const cx = classNames.bind(style);

interface Props {
  selectHandler: (idx: number) => void;
  totalPrice: number;
  recentlySelect?: number;
  selectedProduct?: SelectedType;
  productInfo?: ProductInfoType;
  setCnt?: (inputCnt: number, productId: string) => void;
  saveStorage?: () => void;
}

function ProductInfo({
  selectedProduct,
  totalPrice,
  recentlySelect,
  productInfo,
  selectHandler,
  setCnt,
  saveStorage,
}: Props) {
  return {
    tagName: 'div',
    props: {
      className: cx('ProductDetailPage'),
    },
    childNode: [
      {
        tagName: 'h1',
        childNode: productInfo?.name,
      },
      {
        tagName: 'div',
        props: {
          className: cx('ProductDetail'),
        },
        childNode: [
          {
            tagName: 'img',
            props: {
              src: productInfo && productInfo.imageUrl,
            },
          },
          {
            tagName: 'div',
            props: {
              className: cx('ProductDetail__info'),
            },
            childNode: [
              {
                tagName: 'h2',
                childNode: productInfo?.name,
              },
              {
                tagName: 'div',
                childNode: productInfo?.price
                  ? `${priceFormat(productInfo.price)}원~`
                  : '0원',
                props: {
                  className: cx('ProductDetail__price'),
                },
              },
              {
                tagName: 'select',
                event: {
                  type: 'change',
                  eventFunc: function () {
                    const { options } = this;
                    selectHandler(options.selectedIndex);
                  },
                },
                childNode: productInfo
                  ? [
                      {
                        tagName: 'option',
                        childNode: '선택하세요',
                      },
                      ...(productInfo as ProductInfoType).productOptions.map(
                        (option) => {
                          const { id: productId, name, price, stock } = option;
                          return {
                            tagName: 'option',
                            childNode:
                              stock === 0
                                ? `(품절) ${productInfo.name}${name}`
                                : price === 0
                                ? `${productInfo.name}${name}`
                                : `${productInfo.name}${name}(+${priceFormat(
                                    price,
                                  )}원)`,
                            props: {
                              disabled: stock === 0,
                              value: name,
                              selected:
                                recentlySelect &&
                                recentlySelect === productId &&
                                'selected',
                            },
                          };
                        },
                      ),
                    ]
                  : [
                      {
                        tagName: 'option',
                        childNode: '선택하세요',
                      },
                    ],
              },
              {
                tagName: 'div',
                props: {
                  className: cx('ProductDetail__selectedOptions'),
                },
                childNode: [
                  {
                    tagName: 'h3',
                    childNode: '선택된 상품',
                  },
                  {
                    tagName: 'ul',
                    childNode: selectedProduct && [
                      ...Object.keys(selectedProduct).map((id: string) => {
                        const { name, price, quantity, stock } =
                          selectedProduct[id];
                        return {
                          tagName: 'li',
                          childNode: {
                            tagName: 'div',
                            frontStringNode: `${
                              productInfo?.name
                            } ${name} ${priceFormat(price)}원`,
                            childNode: {
                              node: document.createElement('input'),
                              props: {
                                type: 'number',
                                value: quantity,
                                min: 0,
                                max: stock,
                                tabIndex: 0,
                              },
                              event: [
                                {
                                  type: 'input',
                                  eventFunc: (e: InputEvent) => {
                                    const inputCnt = Number(
                                      (e.target as HTMLInputElement).value,
                                    );
                                    if (setCnt) setCnt(inputCnt, id);
                                  },
                                },
                              ],
                              backStringNode: '개',
                            },
                          },
                        };
                      }),
                    ],
                  },
                  {
                    tagName: 'div',
                    childNode: `${priceFormat(totalPrice)} 원`,
                    props: {
                      className: cx('ProductDetail__totalPrice'),
                    },
                  },
                  {
                    tagName: 'button',
                    props: {
                      className: cx('OrderButton'),
                    },
                    childNode: '주문하기',
                    event: {
                      type: 'click',
                      eventFunc: () => {
                        if (saveStorage) saveStorage();
                        useRedirection(`/web/cart`);
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
}

export default ProductInfo;
