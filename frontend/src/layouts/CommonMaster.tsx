import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Head from 'next/head'
import React from 'react'

export default function CommonMaster({ children, title = "Upkaran" }: { children: React.ReactNode, title?: string }) {
    return <>
        <Head>
            <title>{title == 'Upkaran' ? title : title + ' - Upkaran'}</title>
        </Head>
        <Navbar />
        <main className='min-h-96 mx-auto pb-4 bg-white dark:bg-gray-900'>
            {children}
        </main>
        <Footer />
    </>
}
