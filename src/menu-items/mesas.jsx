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
  title: 'Gestion de mesas',
  type: 'group',
  children: [
    {
      id: '1',
      title: 'ver mesas',
      type: 'item',
      url: '/tablets',
      icon: icons.ChromeOutlined
    },
    {
      id: '2',
      title: 'Crear una mesa',
      type: 'item',
      url: '/create',
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
