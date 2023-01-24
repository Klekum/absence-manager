import React from 'react';
import ReactDOM from 'react-dom/client';
import { setupStore } from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MemberDetail } from './MemberDetail';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore({});

const router = createBrowserRouter([
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

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
