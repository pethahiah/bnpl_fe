"use client"

import Link from "next/link";
import Button from "../Button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface INavItems {
  name: string | undefined;
  path: string;
  title: string;
  action?: Array<{
    label: string;
    icon?: string
    onClick: () => void;
    className?: string;
  }>
}

type TabComponentSize = 'sm' | 'md' | 'lg';

const sizeStyles = {
  sm: {
    container: 'px-2 pt-2',
    navBar: 'min-h-10',
    nav: 'h-10 p-1',
    link: 'px-3 text-xs',
    buttonIcon: 16,
    buttonFont: 'text-xs',
  },
  md: {
    container: 'px-3 pt-3',
    navBar: 'min-h-12',
    nav: 'h-12 p-1.5',
    link: 'px-4 text-sm',
    buttonIcon: 18,
    buttonFont: 'text-sm',
  },
  lg: {
    container: 'px-5 pt-4',
    navBar: 'min-h-16',
    nav: 'h-14 p-2',
    link: 'px-5 text-base',
    buttonIcon: 20,
    buttonFont: 'text-base',
  },
};

export default function TabComponent({
  navItems,
  children,
  size = 'md',
}: {
  navItems: Array<INavItems>;
  children: React.ReactNode;
  size?: TabComponentSize;
}) {
  const pathname = usePathname();
  const checkIsActive = (route: string | undefined) => pathname?.startsWith(route || "");
  const styles = sizeStyles[size];

  return (
    <div className={`w-full min-h-full h-auto flex flex-col gap-3 items-start ${styles.container}`}>
      <div className={`w-full flex flex-row justify-between items-center ${styles.navBar}`}>
        <div className={`bg-white rounded-full flex flex-row justify-between items-center w-fit ${styles.nav}`}>
          {navItems.map((itm) => (
            <Link
              className={`text-black h-full rounded-full flex justify-center items-center ${styles.link}`}
              href={itm.path}
              key={itm.path}
              style={{
                background: checkIsActive(itm.path) ? '#F5F5F5' : 'transparent',
              }}
            >
              {itm.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-row gap-2 flex-wrap justify-end items-center">
          {navItems.map((itm, index) => {
            if (!itm.action || itm.action.length === 0) return null;
            if (itm.path !== pathname) return null;
            return itm.action.map((action, aIdx) => (
              <Button
                key={aIdx}
                label={action.label}
                type="flat"
                btnActionType="button"
                leftIcon={
                  action.icon
                    ? <Image src={action.icon} width={styles.buttonIcon} height={styles.buttonIcon} alt="Create" />
                    : undefined
                }
                className={`!m-0 font-medium !w-fit ${styles.buttonFont} ${action.className && action.className}`}
                onClick={action.onClick}
              />
            ));
          })}
        </div>
      </div>
      <div className="w-full min-h-[80vh] h-auto flex flex-col justify-between items-start bg-white">
        {children}
      </div>
    </div>
  );
}