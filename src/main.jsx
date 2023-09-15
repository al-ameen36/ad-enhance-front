import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Posts from './pages/posts/posts.jsx';
import Post from './pages/posts/post.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Posts />,
  },
  {
    path: "/post",
    element: <Post />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
