import { Navigate } from "react-router-dom";

import Home from '../pages/Home';
import Recommend from '../pages/Recommend';
import Singers from '../pages/Singers';
import Rank from '../pages/Rank';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Navigate to="/recommend" />
      },
      {
        path: "/recommend",
        element: <Recommend />
      },
      {
        path: "/singers",
        element: <Singers />
      },
      {
        path: "/rank",
        element: <Rank />
      }
    ]
  }
]
