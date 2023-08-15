import {ReactNode} from 'react';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons/faPhoneAlt';
import {faShippingFast} from '@fortawesome/free-solid-svg-icons/faShippingFast';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function MarsTopNav() {
	return (
		<nav className={'mars-top-nav'}>
			<div className={'container-xxl mars-top-nav__container'}>
				<div className={'mars-top-nav__contacts'}>
					<Contact href={'tel:0123456789'}
									 label={'0123456789'}
									 icon={<FontAwesomeIcon icon={faPhoneAlt} />}
					/>
					<Contact href={''}
									 label={'0123456789'}
									 icon={<FontAwesomeIcon icon={faWhatsapp} />}
					/>
				</div>
				<div className={'mars-top-nav__note'}>
					<p>
						Mở cửa từ 8:00am-6:00pm. <FontAwesomeIcon icon={faShippingFast} className={'text-theme-color ms-1'} />
					</p>
				</div>
				<ul className={'mars-top-nav__menu list-unstyled'}>
					<li className={'mars-top-nav__menu-item'}>
						<Link href={'/shipping'}>
							<a className='mars-top-nav__menu-link'>Vận chuyển</a>
						</Link>
					</li>
					<li className={'mars-top-nav__menu-item'}>
						<Link href={'/about'}>
							<a className='mars-top-nav__menu-link'>Về chúng tôi</a>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

const Contact = ({href, label, icon}: {href: string, label: string, icon?: ReactNode}) => {
	return (
		<div className={'mars-top-nav__contact'}>
			{icon &&
			<a className={'mars-top-nav__contact-icon'} href={href}>{icon}</a>}
			<a className={'mars-top-nav__contact-txt'} href={href}>
				{label}
			</a>
		</div>
	);
};