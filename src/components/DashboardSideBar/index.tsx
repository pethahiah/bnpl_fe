'use client'
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";
import Logo from '../Logo';
import './dashboardSideBar.css';
import { useEffect, useState } from 'react';
import ArrowDownSVG from '../SVG/ArrowDownSVG';
import LogoutSVG from '../SVG/Logout';
import SettingsSVG from '../SVG/Settings';
import { useAppSelector } from '@/store/hooks';
import { handleSideNavToggle } from '@/store/actions/credit/dashboardActions';

interface INavItem {
  name: string
  path?: string
  title: string
  img?: React.ReactNode
  icon?: () => JSX.Element
  type: "link" | "collapse" | string
  children?: Array<INavItem>
}

const DashboardSideBar = ({ items, firstItem }: { items: Array<INavItem>, firstItem: string }) => {
  const { showNav } = useAppSelector((state) => state.dashboard);


  useEffect(() => {
    const showInfo = localStorage.getItem('toggle-info');
    if (!showInfo) {
      localStorage.setItem('toggle-info', 'true');
    }
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  }

  return (
    <>
      <div className={`side-nav w-[85vw] lg:w-[250px] xl:w-[300px] h-[100vh] fixed lg:sticky top-0 left-0 bg-white  pl-[4px] lg:pl-0 overflow-auto ${showNav ? 'show-nav' : 'hide-nav'}`}>
        <div>
          <div className="logo-wrapper px-6 py-5 flex flex-row lg:justify-center justify-between items-center sticky top-0 ">
            <div className="w-[250px] sm:w-auto">
              <Logo />
            </div>

            <svg
              onClick={() => {
                handleSideNavToggle(!showNav);
                !localStorage.getItem('toggle-info') && localStorage.setItem('toggle-info', 'true');
              }}
              xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className='flex lg:hidden cursor-pointer'>
              <path d="M15.787 14.7579L9.02831 7.99554L15.787 1.23316C16.0593 0.951224 16.0593 0.504153 15.787 0.222124C15.508 -0.0669215 15.0476 -0.074916 14.7587 0.20427L7.99997 6.96665L1.24132 0.204359C0.959535 -0.0679875 0.512705 -0.0679875 0.230828 0.204359C-0.0580623 0.483545 -0.0660523 0.944206 0.212983 1.23325L6.97163 7.99554L0.212983 14.7578C0.0766172 14.8943 1.81872e-08 15.0793 1.81872e-08 15.2722C-8.88562e-05 15.6741 0.325557 15.9999 0.727198 16C0.920117 16.0002 1.10513 15.9234 1.24132 15.7867L7.99997 9.02443L14.7587 15.7868C14.8949 15.9235 15.08 16.0003 15.2729 16C15.4657 15.9999 15.6505 15.9233 15.7869 15.787C16.071 15.5028 16.0711 15.0421 15.787 14.7579Z" fill="#222222B2" />
            </svg>
          </div>
          <ul>
            {
              items.map((navItem) => {
                return (
                  <SidebarItem key={navItem.name} navItem={navItem} firstItem={firstItem} />
                )
              })
            }
          </ul>
        </div>
        <div className="s-openner border-[#22222226] border-t w-10/12 self-center">
          <li
            className='flex flex-row justify-start items-center py-2 pl-2 !w-full h-8 cursor-pointer'
            onClick={() => { }}>
            <SettingsSVG />
            <span className='text-white'>Users</span>
          </li>
          <li
            className='flex flex-row justify-start items-center py-2 pl-2 !w-full h-8 cursor-pointer'
            onClick={() => { }}>
            <SettingsSVG />
            <span className='text-white'>Settings</span>
          </li>
          <li className='flex flex-row justify-start items-center py-2 pl-2 !w-full h-8 cursor-pointer' onClick={() => {
            handleLogout()
          }}>
            <LogoutSVG />
            <span className='text-white'>Log Out</span>
          </li>
        </div>
      </div>
      <div
        className={`${showNav ? "block" : "hidden"} lg:hidden w-full h-[100vh] fixed top-0 right-0 bg-[#0000008a] z-[8] `}
        onClick={() => {
          handleSideNavToggle(false);
        }} />
    </>
  );
}

const SidebarItem = ({ navItem, firstItem }: { navItem: INavItem, firstItem?: string }) => {
  const [collapsed, setCollapsed] = useState(true)
  const navigate = useRouter();
  const pathname = usePathname()
  const location = pathname.split("/");
  return (
    <div className='relative w-[80%] min-h-[32px] h-auto my-1 !p-0 flex flex-col items-center'>
      <li
        onClick={() => {
          if (navItem.type === "link") {
            navItem.path && navigate.push(navItem.path);
            if (window.innerWidth < 780) {
              // appDispatch(toggleSideNav(false));
            }
          }
          else if (navItem.type === "collapse") {
            setCollapsed(!collapsed);
          }
        }}
        className={`
      flex flex-row !h-auto min-h-[32px] !m-0 px-2 justify-between items-center cursor-pointer
      ${navItem.type}
      ${(
            (navItem.title === 'Home' && location[2] === '') ||
              location[2] === navItem.name ||
              (navItem.title === firstItem && location.length === 2) ||
              // (navItem.title === firstItem && location.length === 4) ||
              (location[4] && location[4] === navItem.name) ||
              (location.at(-1) === navItem.name
              )
              ? "selected"
              : ""
          )}`}
      >

        <div className="flex items-center">
          {
            navItem.icon ?
              // @ts-ignore
              navItem.icon() :
              navItem.img ?
                // @ts-ignore
                <img src={navItem.img} alt="" className='mr-4 fill-black' />
                : null
          }
          <span className='text-sm text-[#FFFFFFB2]'>{navItem.type === "collapse" ? navItem.title.toUpperCase() : navItem.title}</span>
        </div>

        {
          navItem.type === "collapse" ?
            <ArrowDownSVG className={`transition-transform w-[10px] ease ${collapsed ? "rotate-180" : "rotate-0"}`} />
            : null
        }
      </li>
      {
        (navItem.type === "collapse" && navItem.children)
        &&
        (
          <ul className={`collapsibleLst mb-2 w-[120%]
          ${collapsed ?
              "collapsed"
              :
              "noCollapsed"
            }`}>
            {
              navItem.children?.map((item) => {
                return (
                  <SidebarItem navItem={item} key={item.name} />
                )
              })
            }
          </ul>
        )
      }
    </div>
  )
}

export default DashboardSideBar;
