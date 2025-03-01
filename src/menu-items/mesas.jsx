// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const mesas = {
  id: 'Mesas',
  title: 'Mozo',
  type: 'group',
  children: [
    {
      id: '1',
      title: 'Mesas disponibles',
      type: 'item',
      url: '/tablets',
      icon: icons.ChromeOutlined
    },
    {
      id: '2',
      title: 'Entregar',
      type: 'item',
      url: '/mozos',
      icon: icons.ChromeOutlined
    },
    {
      id: '3',
      title: 'Cuenta',
      type: 'item',
      url: '/mesaAcobrar',
      icon: icons.ChromeOutlined
    },
    {
      id: '4',
      title: 'Pedido para llevar',
      type: 'item',
      url: '/llevar',
      icon: icons.ChromeOutlined
    },
    /* {
      id: 'update',
      title: 'Actualizar una mesa',
      type: 'item',
      url: '/tablets',
      icon: icons.ChromeOutlined
    },
    {
      id: 'delete',
      title: 'Eliminar una mesa',
      type: 'item',
      url: '/tablets',
      icon: icons.ChromeOutlined
    } */
  ]
};

export default mesas;
