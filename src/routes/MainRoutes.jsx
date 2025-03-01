import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import Tablets from 'pages/tablets/Tablets';
import Create from 'pages/tablets/Create';
import Orders from 'pages/ordenes/Orders'; 
import Ticket from 'pages/ordenes/Ticket';

import OrderKitchen from 'pages/ordenes/OrderKitchen';
import CreateOrder from 'pages/ordenes/CreateOrder';
import Customers from 'pages/ordenes/Customers';

import ToTable from 'pages/ordenes/ToTable';
import Charge from 'pages/caja/Charge';
import NotAvailable from 'pages/tablets/NotAvailable';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const Products = Loadable(lazy(() => import('pages/productos/Products')));


const MainRoutes = {
  path: '/',
  element: <Dashboard />,  // Componente principal
  children: [
    {
      index: true,  // Indica que esta es la ruta por defecto cuando se visita "/"
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',  // Ruta "/dashboard"
      element: <DashboardDefault />
    },
    {
      path: 'tablets',  // Ruta "/tablets"
      element: <Tablets />
    },
    {
      path: 'create',  // Ruta "/create"
      element: <Create />
    },
    {
      path: 'ordenes',  // Ruta "/ordenes"
      element: <Orders />
    },
    {
      path: 'ticket/:id',  // Ruta dinámica "/ticket/:id"
      element: <Ticket />
    },
    {
      path: 'cocina',  
      element: <OrderKitchen />
    },
    {
      path: 'clientes',  
      element: <Customers />
    },
    {
      path: 'mozos',   
      element: <ToTable />
    },
    {
      path: 'cobros',   
      element: <Charge />
    },
    {
      path: 'mesaAcobrar',   
      element: <NotAvailable />
    },
    {
      path: 'createOrder/:id',  
      element: <CreateOrder />
    },
    {
      path: 'llevar',  
      element: <CreateOrder />
    }
  ]
};
export default MainRoutes;
