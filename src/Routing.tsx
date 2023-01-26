import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import App from './App';
import { MemberDetail } from './member_detail/MemberDetail';
import { setupStore } from './store';

const store = setupStore({});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider store={store}>
      <App />
    </Provider>,
    children: [
      {
        path: "member/:id",
        element: <MemberDetail />,
      },
    ],
  },
]);

export const Routing = () => <RouterProvider router={router} />