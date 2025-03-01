import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
}


const caja = {
  id: 'caja',
  title: 'Caja',
  type: 'group',
  children: [
    {
      id: 'cobros',
      title: 'cobros',
      type: 'item',
      url: '/cobros',
      icon: icons.ChromeOutlined
    },
/*     {
      id: '2',
      title: 'Cocina',
      type: 'item',
      url: '/cocina',
      icon: icons.ChromeOutlined
    }, */
   
  ]
};

export default caja;