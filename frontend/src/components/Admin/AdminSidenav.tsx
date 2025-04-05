
"use client";

import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import Link from "next/link";
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiShoppingBag,
    HiTable,
    HiUser,
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export default function AdminSidenav({ isOpen }: { isOpen: boolean }) {
    return (
        <Sidebar color="white" aria-label="Sidebar with multi-level dropdown example" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <SidebarItems>
                <SidebarItemGroup>
                    <SidebarItem icon={HiUser}><Link href="/mstcadmin/users">Add/Edit MSTC Users</Link></SidebarItem>
                    <SidebarCollapse
                        icon={HiShoppingBag}
                        label="Masters"
                        renderChevronIcon={(theme, open) => {
                            const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                            return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? "on" : "off"])} />;
                        }}
                    >
                        <SidebarItem><Link href="/mstcadmin/equipment">Equipment Master</Link></SidebarItem>
                        <SidebarItem><Link href="/mstcadmin/location">Location Master</Link></SidebarItem>
                    </SidebarCollapse>
                </SidebarItemGroup>
                <SidebarItemGroup>
                    <SidebarItem href="#" icon={HiInbox}>
                        Billing Report
                    </SidebarItem>
                    <SidebarCollapse
                        icon={HiShoppingBag}
                        label="MIS"
                        renderChevronIcon={(theme, open) => {
                            const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                            return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? "on" : "off"])} />;
                        }}
                    >
                        <SidebarItem href="#">Supplier MIS</SidebarItem>
                        <SidebarItem href="#">Product MIS</SidebarItem>
                        <SidebarItem href="#">User MIS</SidebarItem>
                    </SidebarCollapse>
                </SidebarItemGroup>
                <SidebarItemGroup>
                    <SidebarItem href="#" icon={HiInbox}>MSMEs</SidebarItem>
                    <SidebarItem href="#" icon={HiInbox}>Notifications</SidebarItem>
                    <SidebarItem href="#" icon={HiInbox}>Service Charge Module</SidebarItem>
                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    );
}
