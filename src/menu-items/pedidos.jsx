// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pedidos = {
  id: 'Pedidos',
  title: 'Gestion de pedidos',
  type: 'group',

  children: [
    {
      id: 'get-pedidos',
      title: 'Historial',
      type: 'item',
      url: '/Ordenes',
      icon: icons.LoginOutlined,
     
    },
 
  
  ]
};

export default pedidos;
