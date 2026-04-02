import { DashboardIconG } from '../../assets/googleIcons/Dashboard';
import { HomePinIcon } from '../../assets/googleIcons/HomePin';
import { ListAltG } from '../../assets/googleIcons/ListAlt';
import {
  LogOut,
  PersonIconG,
  Favorite
} from '../../utils/icon';
export const profileData = [
  {
    id: 0,
    title: 'Dashboard',
    icon: <PersonIconG />,
    screenName: 'OrderDashBoardScreen',
  },
  {
    id: 1,
    title: 'Order History',
    icon: <ListAltG />,
    screenName: 'OrderDashBoardScreen',
  },
  {
    id: 2,
    title: 'Addressess',
    icon: <HomePinIcon />,
    screenName: 'OrderDashBoardScreen',
  },
  {
    id: 3,
    title: 'Purchase List',
    icon: <Favorite />,
    screenName: 'OrderDashBoardScreen',
  },
  {
    id: 4,
    title: 'Profile',
    icon: <PersonIconG />,
    screenName: 'OrderDashBoardScreen',
  },
  {
    id: 5,
    title: "Sign Out",
    icon: <LogOut />,
    screenName: 'OrderDashBoardScreen',
  },
];


export const orderDashBoardData = [
  {
    id: 0,
    title: 'Dashboard',
    icon: DashboardIconG, // 👈 remove <>
  },
  {
    id: 1,
    title: 'Order History',
    icon: ListAltG,
  },
  {
    id: 2,
    title: 'Addressess',
    icon: HomePinIcon,
  },
  {
    id: 3,
    title: 'Purchase List',
    icon: Favorite,
  },
  {
    id: 4,
    title: 'Profile',
    icon: PersonIconG,
  },
];