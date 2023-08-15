import {GetServerSideProps} from 'next';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';
import {IMenuItem} from '../@types/components';
import MainLayout from '../layouts/Main';

export default function ShippingPage({mainMenu, footerMenu}: IPageProps) {
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu}>
			<div className={'container-xxl'}>
				<h1 className='page-heading page-heading_h1  page-heading_m-h1'>About</h1>
				<div className='text-container'>
				<p>
					Chào mừng bạn đến với thế giới của chúng tôi - một không gian nội thất gỗ đầy sắc màu và thẩm mỹ. Chúng tôi là một nhóm những người đam mê về gỗ và nghệ thuật trang trí nội thất, và chúng tôi rất vui được chia sẻ tình yêu và kiến thức của mình với bạn.
				</p>
				<p>
					Chúng tôi tin rằng gỗ không chỉ là một nguyên liệu xây dựng, mà còn là một tác phẩm nghệ thuật tự nhiên đầy sức sống. Chúng tôi tìm kiếm những mảnh gỗ đẹp nhất từ khắp nơi trên thế giới và biến chúng thành những sản phẩm nội thất độc đáo và thú vị. Sứ mệnh của chúng tôi là mang đến cho bạn không gian sống và làm việc trở nên ấm áp, thư giãn và độc đáo hơn bằng những tác phẩm nghệ thuật từ gỗ.
				</p>
				<p>
					Chúng tôi không chỉ đơn thuần là một cửa hàng trực tuyến, mà còn là một cộng đồng yêu thích vẻ đẹp của gỗ. Trên trang web này, bạn không chỉ có cơ hội mua sắm các sản phẩm độc đáo mà còn có thể tham gia vào các hoạt động, chia sẻ ý tưởng và tìm hiểu thêm về các loại gỗ, cách sử dụng và bảo quản chúng.
				</p>
				<p>
					Chúng tôi rất vui khi được kết nối và chia sẻ với bạn. Hãy cùng chúng tôi thảo luận, tìm hiểu và khám phá vẻ đẹp của nội thất gỗ trong không gian sống và làm việc của bạn.
				</p>
				<p>
					Cảm ơn bạn đã đồng hành cùng chúng tôi và chúc bạn có những trải nghiệm thú vị trên trang web của chúng tôi!
				</p>
				<p>
					Furniture Store!
				</p>
				</div>
			</div>
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps<IPageProps> = async () => {
	const categoryTree = await apiClient.catalog.getCategoryTree({menu: 'category'});

	const menus = makeAllMenus({categoryTree});

	return {
		props: {
			...menus
		}
	};
};

interface IPageProps {
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}