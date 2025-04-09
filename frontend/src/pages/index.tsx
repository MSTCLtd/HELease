import CategoryCard from '@/components/CategoryCard'
import FeaturesGrid from '@/components/FeaturesGrid'
import CommonMaster from '@/layouts/CommonMaster'
import React from 'react'
import itemAgriculture from '../../assets/item_agriculture.jpg'
import itemEarthmoving from '../../assets/item_earthmoving.jpg'
import itemBuilding from '../../assets/item_building.jpg'
import itemMining from '../../assets/item_mining.jpg'
import itemHandling from '../../assets/item_handling.jpg'
import itemForestry from '../../assets/item_forestry.jpg'
import itemElectrical from '../../assets/item_electrical.jpg'
import itemSupport from '../../assets/item_support.jpg'
import itemSpecialized from '../../assets/item_specialized.jpg'
import ashokLeyland from '../../assets/Ashok-Leyland-Logo.png'
import jcbLogo from '../../assets/JCB-Logo.png'
import tataLogo from '../../assets/Tata_logo.png'
import eicherLogo from '../../assets/Eicher-Motors-Logo.png'
import Image from 'next/image'
import Link from 'next/link'
import CompCarousel from '@/components/Carousel'

export default function index() {
	const customerLogos = [
		ashokLeyland,
		jcbLogo,
		tataLogo,
		eicherLogo
	]
	return (<CommonMaster title='Welcome'>

		<div className="grid grid-cols-3 gap-4 bg-gray-900">
			<div className="col-span-2">
				<CompCarousel />
			</div>
			<div>
				<br />
				<FeaturesGrid />
				<br />
			</div>
		</div>
		<div className='max-w-screen-2xl mx-auto'>
			<div className="mt-6 space-y-4 md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-4 xl:gap-8 md:space-y-0 md:mb-8 md:mt-12 animate-scroll hover:pause">
				{customerLogos.map((logo, index) => (
					<Link href={"/brand/" + (index + 1)} key={index} className="flex justify-center items-center p-8 text-center bg-gray-50 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800">
						<Image src={logo} width={80} height={10} alt='Ashok Leyland Logo' />
					</Link>
				))}
				{/* <div className="flex justify-center items-center p-8 text-center bg-gray-50 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800">
					<Image src={jcbLogo} width={150} height={30} alt='Ashok Leyland Logo' />
				</div>
				<div className="flex justify-center items-center p-8 text-center bg-gray-50 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800">
					<Image src={tataLogo} width={100} height={30} alt='Ashok Leyland Logo' />
				</div>
				<div className="flex justify-center items-center p-8 text-center bg-gray-50 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800">
					<Image src={eicherLogo} width={150} height={30} alt='Ashok Leyland Logo' />
				</div> */}
			</div>
			<br />
			<h1 className='text-center text-3xl dark:text-white font-bold'><span className='underlined'>Equipment Types</span></h1>
			<br />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-4">
				<CategoryCard title='Agriculture' image={itemAgriculture} link='#' />
				<CategoryCard title='Earthmoving' image={itemEarthmoving} link='#' />
				<CategoryCard title='Construction Machinery' image={itemBuilding} link='#' />
				<CategoryCard title='Mining Equipment' image={itemMining} link='#' />
				<CategoryCard title='Material Handling' image={itemHandling} link='#' />
				<CategoryCard title='Forestry' image={itemForestry} link='#' />
				<CategoryCard title='Electrical Equipments' image={itemElectrical} link='#' />
				<CategoryCard title='Support Equipments' image={itemSupport} link='#' />
				<CategoryCard title='Agricultural Equipments' image={itemAgriculture} link='#' />
				<CategoryCard title='Specialized Equipments' image={itemSpecialized} link='#' />
			</div>
		</div>
	</CommonMaster>
	)
}
