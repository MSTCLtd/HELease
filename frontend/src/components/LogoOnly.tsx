import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../assets/logo.png'

export default function LogoOnly() {
    return (
        <div className="shrink-0">
            <Link href="/">
                <div className="grid grid-flow-col ">
                    <div className="row-span-3 mr-2">
                        <Image src={logo} alt="logo" width={40} />
                    </div>
                </div>
            </Link>
        </div>
    )
}
