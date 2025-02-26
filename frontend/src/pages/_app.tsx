import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono, Bakbak_One } from "next/font/google";
import 'flowbite';


const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const bakbak = Bakbak_One({
	variable: "--font-bakbak",
	subsets: ['devanagari'],
	weight:['400']
})

export default function App({ Component, pageProps }: AppProps) {
	return <main className={`${geistSans.className} ${geistMono.variable} ${bakbak.variable}`}>
		<Component {...pageProps} />
	</main>
}
