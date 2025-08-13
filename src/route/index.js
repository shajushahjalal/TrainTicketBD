import { lazy } from 'react';
import RouteConstant from './RouteConstant';

const Index = lazy(() => import('../pages/Index'))

const routes = [
  {
    path      : RouteConstant.base_path,
    pageTitle : "BD Train Ticket",
    element   : Index,
  },
  {
    path      : RouteConstant.search_train,
    pageTitle : "Seatch Train",
    element   : Index,
  },
  {
    path      : RouteConstant.pasenger_details,
    pageTitle : "Seatch Train",
    element   : Index,
  },
  {
    path      : RouteConstant.confirm_ticket,
    pageTitle : "Seatch Train",
    element   : Index,
  }
];

export default routes;