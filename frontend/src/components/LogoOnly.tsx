import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../../assets/upkaran_logo2.png'

export default function LogoOnly({ size = 40 }: { size?: number }) {
    return (
        <div className="shrink-0">
            <Link href="/">
                <div className="grid grid-flow-col ">
                    <div className="row-span-3 mr-2">
                        <Image src={logo} alt="logo" width={size} />
                    </div>
                </div>
            </Link>
        </div>
    )
}
