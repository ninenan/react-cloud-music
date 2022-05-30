// import React from 'react';
// import { Redirect } from "react-router-dom";
import Home from '../pages/Home';
import Recommend from '../pages/Recommend';
import Singers from '../pages/Singers';
import Rank from '../pages/Rank';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Home,
  Recommend,
  Singers,
  Rank
}

// eslint-disable-next-line import/no-anonymous-default-export
// export default [
//   {
//     path: "/",
//     component: Home,
//     routes: [
//       {
//         path: "/",
//         exact: true,
//         component: Home
//         // render: () => (
//         //   <Redirect to={"/recommend"} />
//         // )
//       },
//       {
//         path: "/recommend",
//         component: Recommend
//       },
//       {
//         path: "/singers",
//         component: Singers
//       },
//       {
//         path: "/rank",
//         component: Rank
//       }
//     ]
//   }
// ]