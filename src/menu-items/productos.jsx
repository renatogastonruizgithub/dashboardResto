// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const productos = {
  id: 'Productos',
  title: 'Gestion de productos',
  type: 'group',
  children: [
    {
      id: 'get-product',
      title: 'Ver productos',
      type: 'item',
      url: '/Products',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'create-product',
      title: 'Cargar productos',
      type: 'item',
      url: '/Products',
      icon: icons.FontSizeOutlined
    },
    {
      id: 'update-product',
      title: 'Actualizar producto',
      type: 'item',
      url: '/Products',
      icon: icons.BgColorsOutlined
    },
    {
      id: 'delete-product',
      title: 'Eliminar producto',
      type: 'item',
      url: '/Products',
      icon: icons.BarcodeOutlined
    }
  ]
};

export default productos;
