import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import ProductsList from '../components/ProductsList';
import MainLayout from '../layouts/Main';
import {apiClient} from '../lib/api';
import {makeAllMenus} from '../lib/menu';
// import VerticalMenu from '../components/VerticalMenu';
import {IMenuItem} from '../@types/components';
import SwiperSlider from '../components/SwiperSlider';
import mobileSlider1Img from '../assets/mobile-slider-1.png';
import mobileSlider2Img from '../assets/mobile-slider-2.png';
// import CoverTextInCenter from '../components/CoverTextInCenter';
// import bgImg from '../assets/cover-bg.jpeg';
// import bgPortraitImg from '../assets/cover-bg-portrait.jpg';
import TextWithIcons from '../components/TextWithIcons';
import {faBug} from '@fortawesome/free-solid-svg-icons/faBug';
import {faShieldAlt} from '@fortawesome/free-solid-svg-icons/faShieldAlt';
import {faSmile} from '@fortawesome/free-solid-svg-icons/faSmile';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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
                icon={faBug}
                className={'text-with-icons__icon'}
              />
            ),
            title: 'Does not slip in the hands',
            comment: 'Anti-slip coating - for reliability.',
          },
          {
            icon: (
              <FontAwesomeIcon
                icon={faShieldAlt}
                className={'text-with-icons__icon'}
              />
            ),
            title: 'Extra phone protection',
            comment: 'Anti-slip coating - for reliability.',
          },
          {
            icon: (
              <FontAwesomeIcon
                icon={faSmile}
                className={'text-with-icons__icon'}
              />
            ),
            title: 'Looks nice',
            comment: 'With our cases your phone look even better than without.',
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
  const {products} = axios
    .get<IProductResponse>(API_GET_PRODUCT)
    .then((res) => res.data);
  const basicSettings = (await apiClient.system.fetchSettings([
    'system.locale',
    'system.currency',
  ])) as IBasicSettings;

  const menus = makeAllMenus({categoryTree});

  return {
    props: {
      products: [
        {
          name: 'Bộ bàn ghế gỗ lim',
          description: 'Bàn ghế gỗ lim nhập khẩu',
          price: 50000000,
          imageUrl:
            'https://xuongdogogiagoc.com/wp-content/uploads/2018/12/bo-au-a-go-lim-1.jpg',
          categoryId: 1,
          supplierId: 7,
          unit: 'Bộ',
          qty: 15,
          isActive: false,
        },
      ],
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
      caption: 'Decorate your phone with our cases!',
      captionPosition: 'bottom',
      useFilling: true,
      fillingColor: '#000000',
      fillingOpacity: 0.4,
    },
    {
      img: mobileSlider2Img.src,
      link: '',
      caption: 'Pray not for easy lives, pray to be stronger men.',
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
