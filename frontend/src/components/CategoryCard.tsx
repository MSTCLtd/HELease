import Image, { StaticImageData } from 'next/image'
import React from 'react'
import Link from 'next/link'

export default function CategoryCard({ title, link = "", image }: { title: string, link: string, image: StaticImageData }) {
    return (<Link href={link}>
        <div className="relative max-w-xl mx-auto transition-all duration-300 hover:scale-105">
            <Image className="h-32 w-full object-cover rounded-md" src={image} alt="Random image" width={100} height={100} />
            <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-xl font-bold text-center">{title}</h2>
            </div>
        </div>
    </Link>
    )
}
