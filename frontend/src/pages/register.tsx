import BuyerRegistrationForm from '@/components/BuyerRegistrationForm';
import SellerRegistrationForm from '@/components/Seller/SellerRegistrationForm';
import CommonMaster from '@/layouts/CommonMaster'
import { Button, Label, Tabs, TabsRef, TextInput } from 'flowbite-react'
import Link from 'next/link';
import React, { useRef, useState } from 'react'
import { HiAdjustments, HiClipboardList, HiMail, HiPhone, HiUserCircle } from "react-icons/hi";

export default function registerbuyer() {
    const tabsRef = useRef<TabsRef>(null);
    const [activeTab, setActiveTab] = useState(0);

    return (
        <CommonMaster title='Register'>
            <section className=" dark:bg-gray-900">
                <div className="px-6 py-8 mx-auto max-w-lg">
                    <Tabs aria-label="Default tabs" variant="fullWidth" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
                        <Tabs.Item active title="Buyer" icon={HiUserCircle}>
                            <BuyerRegistrationForm />
                        </Tabs.Item>
                        <Tabs.Item title="Manufacturer" icon={HiAdjustments}>
                            <SellerRegistrationForm />
                        </Tabs.Item>
                        {/* <Tabs.Item title="MSTC" icon={HiClipboardList}>
                            This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
                            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
                            control the content visibility and styling.
                        </Tabs.Item> */}
                    </Tabs>

                </div>
            </section>
        </CommonMaster>
    )
}
