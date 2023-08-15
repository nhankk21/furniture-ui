import clsx from 'clsx';
import useFormatCurrency from '../../hooks/useFormatCurrency';

export default function ProductPrice({
  price,
  className = 'products__price',
}: {
  price: number;
  className?: string;
}) {
  const {formatCurrency} = useFormatCurrency();
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);

  return (
    <div className={className}>
      <span className={clsx('current')}>{formattedPrice}</span>
    </div>
  );
}
