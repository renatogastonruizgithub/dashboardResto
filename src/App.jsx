import { RouterProvider } from 'react-router-dom';

// project import
import router from 'routes';
import ThemeCustomization from 'themes';
import { store } from "./store/store";
import ScrollTop from 'components/ScrollTop';
import { Provider } from 'react-redux';
import { SocketProvider } from 'context/SocketContext';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function App() {
  return (
    <Provider store={store}>

      <SocketProvider>
        <ThemeCustomization>
          <ScrollTop>
            <RouterProvider router={router} />
          </ScrollTop>
        </ThemeCustomization>
      
      </SocketProvider>

    </Provider>
  );
}
