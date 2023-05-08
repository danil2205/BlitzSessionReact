import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData =
  [
    {
      title: 'Accounts',
      path: '/accounts',
      icons: <IoIcons.IoMdPerson />,
      cName: 'nav-text'
    },
    {
      title: 'Hangar',
      path: '/hangar',
      icons: <FaIcons.FaChartBar />,
      cName: 'nav-text'
    },
    {
      title: 'TempAccount',
      path: '/tempAccount',
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

