import clsx from 'clsx';
import Link from 'next/link';
import {IMenuItem} from '../../@types/components';

export default function FooterMenu({menuList}: { menuList: IMenuItem[] }) {
	return (
		<>
			<h3 className='page-footer__header'>Sản phẩm phổ biến</h3>
			<ul className='page-footer-menu list-unstyled' itemScope itemType='//schema.org/ItemList'>
				<li className='page-footer-menu__list-element'>
					<div itemProp='itemListElement' itemScope itemType='//schema.org/ListItem'>
						<a itemProp='url'>
							<span itemProp='name' style={{ color: 'white' }}>Bàn ghế gỗ</span>
						</a>
						<meta itemProp='position' content='0' />
					</div>
				</li>
				<li className='page-footer-menu__list-element'>
					<div itemProp='itemListElement' itemScope itemType='//schema.org/ListItem'>
						<a itemProp='url'>
							<span itemProp='name' style={{ color: 'white' }}>Tủ gỗ</span>
						</a>
						<meta itemProp='position' content='1' />
					</div>
				</li>
				<li className='page-footer-menu__list-element'>
					<div itemProp='itemListElement' itemScope itemType='//schema.org/ListItem'>
						<a itemProp='url'>
							<span itemProp='name' style={{ color: 'white' }}>Kệ rượu</span>
						</a>
						<meta itemProp='position' content='2' />
					</div>
				</li>
				<li className='page-footer-menu__list-element'>
					<div itemProp='itemListElement' itemScope itemType='//schema.org/ListItem'>
						<a itemProp='url'>
							<span itemProp='name' style={{ color: 'white' }}>Sản phẩm mỹ nghệ</span>
						</a>
						<meta itemProp='position' content='3' />
					</div>
				</li>
			</ul>

		</>
	);
}

function ListElement({item, position}: { item: IMenuItem, position: number }) {
	if (item.url) return (
		<>
			<Link href={item.url}>
				<a className={clsx(
					'page-footer-menu__element is-link',
					{active: item.isActive}
				)}>
					<span className='title' itemProp='name'>
						{item.title}
					</span>
				</a>
			</Link>
			<meta itemProp='position' content={String(position + 1)}/>
		</>
	);

	return (
		<div className={clsx(
			'page-footer-menu__element',
			{active: item.isActive}
		)}>
			<span className='page-footer-menu__text-title'>
				{item.title}
			</span>
		</div>
	);
}