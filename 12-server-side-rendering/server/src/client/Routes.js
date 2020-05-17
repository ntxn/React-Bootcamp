import Home from './components/Home';
import UserList, { loadData } from './components/UsersList';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    loadData,
    path: '/users',
    component: UserList,
  },
];
