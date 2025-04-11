import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Geist, Geist_Mono, Bakbak_One, Biryani } from "next/font/google";
import 'flowbite';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from '../../store';
import { useEffect } from "react";
import { REHYDRATE } from "redux-persist";
import { persistStore } from "redux-persist";
import Logo from "@/components/Logo";
import { appWithTranslation } from 'next-i18next'
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import settings from '../../tailwind.config'
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import 'react-data-grid/lib/styles.css';

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
	weight: ['400']
})

const biryani = Biryani({
	weight: ['400', '900'],
	variable: "--font-biryani",
	subsets: ['devanagari'],
})

function Loader() {
	return <div className="flex align-middle min-h-screen min-w-full" style={{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}}>
		<Logo />
	</div>
}

const customTheme: CustomFlowbiteTheme = {
	button: {
		color: {
			primary: 'bg-gradient-to-r from-[#007fff] to-[#00bfff] text-white hover:opacity-80 transition-all',
			secondary: 'bg-gradient-to-l from-[#ffcc00] to-[#ff4500]',
		}
	}
}

const App = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		persistor.dispatch({
			type: REHYDRATE,
			key: ""
		});
	}, [])

	let persistor = persistStore(store);

	return <Provider store={store}>
		<PersistGate loading={<Loader />} persistor={persistor}>
			<Flowbite theme={{ theme: customTheme }}>
				<main className={`${geistSans.className} ${geistMono.variable} ${bakbak.variable} ${biryani.variable}`}>
					<Component {...pageProps} />
				</main>
			</Flowbite>
		</PersistGate>
	</Provider>
}

export default appWithTranslation(App)