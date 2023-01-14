import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData =
  [
    {
      title: 'Home',
      path: '/home',
      icons: <AiIcons.AiFillHome />,
      cName: 'nav-text'
    },
    {
      title: 'Accounts',
      path: '/accounts',
      icons: <IoIcons.IoMdPerson />,
      cName: 'nav-text'
    },
    {
      title: 'Session',
      path: '/session',
      icons: <AiIcons.AiOutlineLineChart />,
      cName: 'nav-text'
    },
    {
      title: 'Search User',
      path: '/user-search',
      icons: <IoIcons.IoMdSearch />,
      cName: 'nav-text'
    },
    {
      title: 'Contact Us',
      path: '/contactus',
      icons: <FaIcons.FaQuestionCircle />,
      cName: 'nav-text'
    },
  ];

