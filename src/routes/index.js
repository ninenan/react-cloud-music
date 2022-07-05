import { Navigate } from "react-router-dom";

import Home from '../pages/Home';
import Recommend from '../pages/Recommend';
import Singers from '../pages/Singers';
import Rank from '../pages/Rank';
import Album from '../pages/Album';
import Singer from '../pages/Singer';

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
        element: <Recommend />,
        children: [
          {
            path: "/recommend/:id",
            element: <Album />
          }
        ]
      },
      {
        path: "/singers",
        element: <Singers />,
        children: [
          {
            path: "/singers/:id",
            element: <Singer />
          }
        ]
      },
      {
        path: "/rank",
        element: <Rank />,
        children: [
          {
            path: "/rank/:id",
            element: <Album />
          }
        ]
      }
    ]
  }
]
