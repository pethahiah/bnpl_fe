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
export default function TabComponent(
  {
    navItems,
    children
  }: {
    navItems: Array<INavItems>
    children: React.ReactNode;
  }
) {

  const pathname = usePathname();
  const checkIsActive = (route: string | undefined) => {
    return route === pathname;
  };

  return (
    <div className="w-full min-h-full h-auto flex flex-col gap-3 items-start px-5 pt-4">
      <div className="w-full min-h-16 flex flex-row justify-between items-center">
        <div className="bg-white rounded-full h-14 flex flex-row justify-between items-center w-fit p-2">
          {
            navItems.map((itm) => (
              <Link
                className="text-black px-5 h-full rounded-full flex justify-center text-sm items-center"
                href={itm.path}
                key={itm.path}
                style={{
                  background: checkIsActive(itm.path) ? '#F5F5F5' : 'transparent'
                }}
              >
                {itm.title}
              </Link>
            ))
          }
        </div>
        <div className="flex flex-row gap-2 flex-wrap justify-end items-center">
          {
            navItems.map((itm, index) => {
              if (!itm.action || itm.action.length === 0) return null;
              if (itm.path !== pathname) return null;
              return itm.action.map((action) => (
                <Button
                  key={index}
                  label={action.label}
                  type="flat"
                  btnActionType="button"
                  leftIcon={
                    action.icon
                      ? <Image src={action.icon} width={20} height={20} alt="Create" />
                      : undefined}
                  className={`!m-0 font-medium !w-fit ${action.className && action.className}`}
                  onClick={action.onClick}
                />
              ))
            })
          }
        </div>
      </div>
      <div className="w-full min-h-[80vh] h-auto flex flex-col justify-between items-start bg-white">
        {children}
      </div>
    </div>
  )
}