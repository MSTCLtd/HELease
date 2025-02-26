import UpdateCard from '@/components/UpdateCard'
import CommonMaster from '@/layouts/CommonMaster'
import React, { useEffect, useState } from 'react'


export default function Updates() {
    const [links, setLinks] = useState<Array<{ title: string, body: string, link: string }>>([])

    useEffect(() => {
        setLinks([
            { title: 'Noteworthy technology acquisitions 2021', body: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', link: '/' },
            { title: 'Noteworthy technology acquisitions 2021', body: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', link: '/' },
            { title: 'Noteworthy technology acquisitions 2021', body: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', link: '/' },
            { title: 'Noteworthy technology acquisitions 2021', body: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', link: '/' },
            { title: 'Noteworthy technology acquisitions 2021', body: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', link: '/' },
            { title: 'Noteworthy technology acquisitions 2021', body: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', link: '/' },
            { title: 'Noteworthy technology acquisitions 2021', body: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', link: '/' },
            { title: 'Noteworthy technology acquisitions 2021', body: 'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.', link: '/' },
        ])
    }, [])

    return (
        <CommonMaster>
            <br />
            <div className='max-w-screen-2xl mx-auto'>
                <h1 className='text-3xl mb-5 font-black underlined dark:text-white'>Updates</h1>
                <div className="grid grid-cols-3 gap-4">
                    {links.map(link => <UpdateCard key={link.title} title={link.title} body={link.body} link={link.link} />)}
                </div>
            </div>
        </CommonMaster>
    )
}
