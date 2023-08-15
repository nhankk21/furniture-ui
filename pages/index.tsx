import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import ProductsList from '../components/ProductsList';
import MainLayout from '../layouts/Main';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';
// import VerticalMenu from '../components/VerticalMenu';
import {IMenuItem} from '../@types/components';
import SwiperSlider from '../components/SwiperSlider';
import mobileSlider1Img from '../assets/item-slide-1.jpg';
import mobileSlider2Img from '../assets/item-slide-2.jpg';
// import CoverTextInCenter from '../components/CoverTextInCenter';
// import bgImg from '../assets/cover-bg.jpeg';
// import bgPortraitImg from '../assets/cover-bg-portrait.jpg';
import TextWithIcons from '../components/TextWithIcons';
import {faBug} from '@fortawesome/free-solid-svg-icons/faBug';
import {faShieldAlt} from '@fortawesome/free-solid-svg-icons/faShieldAlt';
import {faSmile} from '@fortawesome/free-solid-svg-icons/faSmile';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 
import {IBasicSettings} from '../@types/settings';
import axios from '../lib/axios';
import {API_GET_PRODUCT} from '../constants/api_key';
import {IProduct, IProductResponse} from '../interface/product';

export default function IndexPage({
  products,
  mainMenu,
  footerMenu,
  basicSettings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <MainLayout
      mainMenu={mainMenu}
      footerMenu={footerMenu}
      basicSettings={basicSettings}
    >
      <div className='container-xxl'>
        <MainPageSlider />
        <h1 className='page-heading page-heading_h1  page-heading_m-h1'>
        Furniture Store
        </h1>
        <ProductsList
          products={products}
          className={'page-block'}
          itemClassName={'products__item_4-in-row'}
        />
      </div>
      <TextWithIcons
        columns={[
          {
            icon: (
              <FontAwesomeIcon
                icon={faHeart}
                className={'text-with-icons__icon'}
              />
            ),
            title: 'Dịch vụ tiện lợi, đa dạng',
            comment: 'Luôn cố gắng để đem tới bạn trải nhiệm tốt nhất',
          },
          {
            icon: (
              <FontAwesomeIcon
                icon={faShieldAlt}
                className={'text-with-icons__icon'}
              />
            ),
            title: 'Uy tín chất lượng',
            comment: 'Uy tín tạo nên thương hiệu',
          },
          {
            icon: (
              <FontAwesomeIcon
                icon={faSmile}
                className={'text-with-icons__icon'}
              />
            ),
            title: 'Hài lòng khách hàng',
            comment: 'Sự hài lòng của các bạn là niềm vui của chúng tôi',
          },
        ]}
        fullWidth={true}
        className={'page-block'}
      />
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps<
  IIndexPageProps
> = async () => {
  const categoryTree = await apiClient.catalog.getCategoryTree({
    menu: 'category',
  });
  const products = await axios
    .get<IProductResponse>(API_GET_PRODUCT,{params: {page:1, limit:8}})
    .then((res) => res.data);
  const basicSettings = (await apiClient.system.fetchSettings([
    'system.locale',
    'system.currency',
  ])) as IBasicSettings;
  const menus = makeAllMenus({categoryTree});

  return {
    props: {
      products: products?.data?.items,
      basicSettings,
      ...menus,
    },
  };
};

interface IIndexPageProps {
  products: IProduct[];
  mainMenu: IMenuItem[];
  footerMenu: IMenuItem[];
  basicSettings: IBasicSettings;
}

function MainPageSlider() {
  const slides = [
    {
      img: mobileSlider1Img.src,
      link: '',
      caption: 'Các sản phẩm gỗ chất lượng!',
      captionPosition: 'bottom',
      useFilling: true,
      fillingColor: '#000000',
      fillingOpacity: 0.4,
    },
    {
      img: mobileSlider2Img.src,
      link: '',
      caption: 'Đa dạng các sản phẩm từ nhiều nhà cung cấp',
      captionPosition: 'bottom',
      useFilling: true,
      fillingColor: '#000000',
      fillingOpacity: 0.4,
    },
  ];

  return (
    <SwiperSlider
      showPrevNext
      // pagination='progressbar'
      size={'large'}
      slides={slides}
      className={'mb-4'}
    />
  );
}
