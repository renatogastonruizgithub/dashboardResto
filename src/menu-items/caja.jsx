import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
}


const caja = {
  id: 'caja',
  title: 'Ventas',
  type: 'group',
  children: [
    {
      id: 'cobros',
      title: 'Cobros del dia',
      type: 'item',
      url: '/cobros',
      icon: icons.ChromeOutlined
    },
    
   
  ]
};

export default caja;