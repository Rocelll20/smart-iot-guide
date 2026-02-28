"use client";

import React from 'react';
import {
  LayoutDashboard,
  AlertCircle,
  Users,
  Settings,
  LogOut,
  Circle,
  UserStar
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '@/public/assets/smart-guide-no-bg.png';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <AlertCircle size={18} />, label: 'Emergency', href: '/dashboard/emergency' },
    { icon: <UserStar size={18} />, label: 'Active Users', href: '/dashboard/active-users' },
  ];

  const accountItems = [
    { icon: <Users size={18} />, label: 'Profile', href: '/dashboard/profile' },
    { icon: <Settings size={18} />, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-64 bg-sidebar rounded-2xl flex flex-col z-50 hidden md:flex transition-transform duration-300 shadow-xl border border-white/5">

      {/* Brand Header */}
      {/* <div className="flex justify-start items-center border-b border-white/5 mx-4 py-6"> */}
      <Link href="/" className="flex justify-start items-center border-b border-white/5 mx-4 py-6">
        <Image
          src={logo}
          alt="Logo"
          width={70}
          height={70}
        />
        <h1 className="ml-[-10px] text-[15px] font-bold tracking-widest uppercase mt-0.5 text-white">SmartGuide</h1>
      </Link>
      {/* </div> */}

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto w-full">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label}>
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl cursor-pointer transition-all w-full mb-2
                  ${isActive
                    ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                  ${isActive ? 'bg-white/20 text-white' : 'bg-[#1a2138] text-[#3b82f6]'}
                `}>
                  {item.icon}
                </div>
                <span className={`text-[13.5px] tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
              </div>
            </Link>
          );
        })}

        <div className="pt-6 mt-6 ml-2">
          <p className="text-[11px] font-bold text-white/50 mb-4 tracking-wider uppercase"> Account </p>

          <div className="space-y-2">
            {accountItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link href={item.href} key={item.label}>
                  <div className={`flex items-center gap-4 px-2 py-3 rounded-2xl cursor-pointer transition-all w-full mb-2
                    ${isActive
                      ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0
                      ${isActive ? 'bg-white/20 text-white' : 'bg-[#1a2138] text-[#3b82f6]'}
                    `}>
                      {item.icon}
                    </div>
                    <span className={`text-[13.5px] tracking-wide ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
                  </div>
                </Link>
              );
            })}

            <Link href="/auth/sign-in">
              <div className="flex items-center gap-4 px-2 py-3 rounded-2xl text-red-400 hover:text-red-300 cursor-pointer transition-all mt-2 hover:bg-white/5">
                <div className="w-8 h-8 rounded-full bg-[#1a2138] text-red-500 flex items-center justify-center shrink-0">
                  <LogOut size={18} />
                </div>
                <span className="font-medium text-[13.5px] tracking-wide">Logout</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Bottom User Icon */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white font-bold text-sm bg-black/40 shadow-inner overflow-hidden relative cursor-pointer hover:border-white/40 transition-colors">
          <span className="relative z-10">N</span>
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
