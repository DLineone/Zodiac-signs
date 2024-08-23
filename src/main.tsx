import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AllSigns from './components/AllSigns.tsx';
import WebApp from '@twa-dev/sdk'
import Sign from './components/Sign';

WebApp.ready();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <AllSigns></AllSigns>,
      },
      {
        path: "/:name",
        element: <Sign></Sign>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
