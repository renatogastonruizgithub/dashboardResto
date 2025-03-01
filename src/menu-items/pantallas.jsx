import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
}


const pantallas = {
  id: 'pantallas',
  title: 'Patanllas',
  type: 'group',
  children: [
    {
      id: 'get-clientes',
      title: 'clientes',
      type: 'item',
      url: '/clientes',
      icon: icons.ChromeOutlined
    },
    {
      id: 'get-cocina',
      title: 'Cocina',
      type: 'item',
      url: '/cocina',
      icon: icons.ChromeOutlined
    },
   
  ]
};

export default pantallas;