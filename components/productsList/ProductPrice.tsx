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

  return (
    <div className={className}>
      <span className={clsx('current')}>{formatCurrency(price)}</span>
    </div>
  );
}
