import {IGetProductsParams, IProduct} from 'Boundless-api-client';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '../hooks/redux';
import {apiClient} from '../lib/api';
import {addPromise} from '../redux/reducers/xhr';
import ProductsSlider from './ProductsSlider';
import axios from '../lib/axios';
import {API_GET_PRODUCT} from '../constants/api_key';

export default function ProductsSliderByQuery({
  query,
  title,
  className,
  wrapperClassName,
}: ProductsSliderByQueryProps) {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const productTest = axios.get(API_GET_PRODUCT).then((res) => res.data);

    console.log(productTest);

    const promise = apiClient.catalog
      .getProducts(query)
      .then(({products}) => setProducts(products))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

    dispatch(addPromise(promise));
  }, [query]); //eslint-disable-line

  if (products && !loading && !products.length) return null;

  return (
    <div className={wrapperClassName || ''}>
      {title && <h2 className='products-slider__by-query-title'>{title}</h2>}
      <ProductsSlider
        className={className}
        loading={loading}
        products={products}
        // swiperProps={{loop: true}}
      />
    </div>
  );
}

interface ProductsSliderByQueryProps {
  title?: string;
  className?: string;
  wrapperClassName?: string;
  query: IGetProductsParams;
}
