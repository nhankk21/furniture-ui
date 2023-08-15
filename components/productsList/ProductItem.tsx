import clsx from 'clsx';
import {useAppDispatch} from '../../hooks/redux';
import {addItem2Cart} from '../../redux/actions/cart';
import {getProductUrl} from '../../lib/urls';
import ProductPrice from './ProductPrice';
import {TQuery} from '../../@types/common';
import Image from 'next/image';
import {IProduct} from '../../interface/product';
import Link from 'next/link';
import ProductLabels from '../product/Labels';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons/faCartPlus';
import NoImage from '../NoImage';
import {productImgRatio} from '../../lib/imgs';
import {TThumbRatio} from 'Boundless-api-client';

export default function ProductItem({
  product,
  //   query,
  //   categoryId,
  className,
}: IProductItemProps) {
  //   const params = {...query};
  // if (categoryId && categoryId !== product.default_category?.category_id) {
  // 	Object.assign(params, {category: categoryId});
  // }
  // const productUrl = getProductUrl(product, params);

  return (
   
    <li
      className={clsx(
        'products__item',
        {
          'in-stock': product.qty > 0,
          'out-of-stock': product.qty <= 0,
        },
        className,
      )}
      data-id={product.id}
      itemScope
      itemType='//schema.org/Product'
    >
      <div className='products__item-wrapper'>
        {product?.imageUrl ? (
          <img
            src={product?.imageUrl}
            width={270}
            height={270}
            // quality={100}
            alt={product?.imageUrl}
          />
        ) : (
          <NoImage ratio='1/1' />
        )}
        <Link href={`/product/${product.id}`}>
          <h4 className='products__title'>
          
            <span itemProp='name'>{product.name}</span>
          </h4>
         </Link>
        <div className={'products__offer-row'}>
          <div className='products__offer'>
            {product.price && <ProductPrice price={product.price} />}
          </div>
          { <Product2Cart product={product} /> }
        </div>
      </div>
      { <ProductSchemaOrgMarkup product={product} /> }
    </li>
    
  );
}

function Product2Cart({product}: {product: IProduct}) {
  const dispatch = useAppDispatch();
  const onAddToCart = () => dispatch(addItem2Cart(product.id, 1, false));

  return (
    <div
      className={clsx('products__to-cart', {
        'products__to-cart_in-stock': product.qty,
        'products__to-cart_out-stock': !product.qty,
      })}
    >
      {product.qty ? (
        <button
          type={'button'}
          className='btn btn-to-cart products__to-cart-btn'
          onClick={onAddToCart}
        >
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      ) : (
        <span className={'text-muted'}>Đã hết hàng</span>
      )}
    </div>
  );
}

// function ProductImage({product, productUrl}: {product: IProduct, productUrl: string}) {
// 	const img = product.images!.find(({is_default}) => is_default);

// 	return (
// 		<Link href={productUrl}>
// 			<a className={'products__image'}>

// 				<ProductLabels labels={product.labels!}
// 											 className={'product__labels_small product__labels_column'}

// 				/>
// 			</a>
// 		</Link>
// 	);
// }

function ProductSchemaOrgMarkup({product}: {product: IProduct}) {
	const schemaAvailability = product.qty ? '//schema.org/InStock' : '//schema.org/OutOfStock';

	return (
		<>
			<meta itemProp='productID' content={String(product.qty)} />
			{product.price &&
			(product.price
					?
					<div itemProp='offers' itemScope itemType='//schema.org/AggregateOffer'>
						<meta itemProp='lowPrice' content={String(product.price)} />
						<meta itemProp='highPrice' content={String(product.price)} />
						
						<link itemProp='availability' href={schemaAvailability} />
					</div>
					:
					<div itemProp='offers' itemScope itemType='//schema.org/Offer'>
					
						<link itemProp='availability' href={schemaAvailability} />
					</div>
			)
			}
		</>
	);
}

interface IProductItemProps {
  product: IProduct;
  query: TQuery;
  categoryId?: number;
  className?: string;
}
