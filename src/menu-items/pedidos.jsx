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
      title: 'Pedidos',
      type: 'item',
      url: '/Ordenes',
      icon: icons.LoginOutlined,
     
    },
   {
      id: 'cocina',
      title: 'Cocina',
      type: 'item',
      url: '/cocina',
      icon: icons.LoginOutlined,
     
    }, 
    /* {
      id: 'delete-order',
      title: 'Eliminar el pedido',
      type: 'item',
      url: '/delete-order',
      icon: icons.ProfileOutlined,
    
    } */
  ]
};

export default pedidos;
