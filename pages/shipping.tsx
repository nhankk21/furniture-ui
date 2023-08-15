import MainLayout from '../layouts/Main';
import {IMenuItem} from '../@types/components';
import {GetServerSideProps} from 'next';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';

export default function ShippingPage({mainMenu, footerMenu}: IShippingPageProps) {
	return (
		<MainLayout mainMenu={mainMenu} footerMenu={footerMenu}>
			<div className={'container-xxl'}>
				<h1 className='page-heading page-heading_h1  page-heading_m-h1'>Shipping</h1>
				<div className='text-container'>
					<p>
						Chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm trực tuyến đáng tin cậy và thuận tiện nhất. Chính vì vậy, chính sách giao hàng của chúng tôi được thiết kế để đảm bảo bạn nhận được sản phẩm đúng hẹn và trong tình trạng hoàn hảo.
					</p>
					<p>
						<strong>Thời gian giao hàng:</strong> Chúng tôi cam kết giao hàng đúng theo thời gian đã cam kết khi bạn đặt hàng. Thời gian giao hàng có thể thay đổi tùy theo vị trí và khoảng cách. Chúng tôi sẽ thông báo rõ ràng về thời gian giao hàng cụ thể khi bạn xác nhận đơn hàng.
					</p>
					<p>
						<strong>Phí giao hàng:</strong> Chúng tôi cung cấp dịch vụ giao hàng có phí dựa trên vị trí giao hàng và kích thước sản phẩm. Phí giao hàng sẽ được hiển thị rõ ràng trong quá trình thanh toán để bạn có thể xem trước và quyết định.
					</p>
					<p>
						<strong>Vận chuyển và đóng gói:</strong> Chúng tôi chú trọng đến việc đóng gói sản phẩm một cách cẩn thận để đảm bảo an toàn trong quá trình vận chuyển. Sản phẩm sẽ được đóng gói bằng vật liệu chất lượng cao để đảm bảo không bị hỏng hóc hay trầy xước.
					</p>
					<p>
						<strong>Theo dõi đơn hàng:</strong> Chúng tôi cung cấp tính năng theo dõi đơn hàng, giúp bạn dễ dàng kiểm tra tình trạng vận chuyển và biết được khi nào sản phẩm sẽ đến tay bạn.
					</p>
					<p>
						<strong>Chính sách đổi trả:</strong> Nếu bạn nhận được sản phẩm bị hỏng hoặc không đúng với mô tả, chúng tôi sẽ hỗ trợ đổi trả hoặc hoàn tiền trong vòng thời gian quy định. Xin vui lòng tham khảo chính sách đổi trả chi tiết trên trang web để biết thêm thông tin.
					</p>
					<p>
						Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc về chính sách giao hàng. Đảm bảo rằng quá trình nhận hàng diễn ra một cách suôn sẻ và bạn có được trải nghiệm mua sắm tốt nhất trên trang web của chúng tôi.
					</p>
				</div>
			</div>
		</MainLayout>
	);
}

export const getServerSideProps: GetServerSideProps<IShippingPageProps> = async () => {
	const categoryTree = await apiClient.catalog.getCategoryTree({menu: 'category'});

	const menus = makeAllMenus({categoryTree});

	return {
		props: {
			...menus
		}
	};
};

interface IShippingPageProps {
	mainMenu: IMenuItem[];
	footerMenu: IMenuItem[];
}