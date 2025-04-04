import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo2 from '../../assets/upkaran_logo2.png'
import { useTranslation } from '../../hooks/useTranslation';

export default function Logo() {
    const { t } = useTranslation()
    return (
        <div className="shrink-0">
            <Link href="/">
                <div className="grid grid-flow-col ">
                    <div className="row-span-3 mr-2">
                        <Image src={logo2} alt="logo" width={65} />
                    </div>
                    <div className="col-span-2">
                        <span className="font-extrabold text-3xl font-bakbak dark:text-white">
                            {t('home.name')}
                        </span>
                        <p className='text-sm bg-gradient-to-r from-red-500 dark:from-red-400 to-teal-400 dark:to-teal-200 bg-clip-text text-transparent'>Empowering Growth</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
