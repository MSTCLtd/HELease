import { Dropdown } from 'flowbite-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { HELActions } from '../../store';

const LanguageSwitcher = () => {
    const { locale, changeLocale, locales } = useTranslation();
    // const [language, setLanguage] = useState("en");
    const router = useRouter()
    const dispatch = useDispatch()
    const state = useSelector((state: any) => state.HELReducer)

    // useEffect(() => {
    //     setLanguage(state.language)
    // }, [])



    const change = (e: { target: any; }) => {
        console.log(e);
        // setLanguage(e.target.value)
        changeLocale(e.target.value)
        dispatch(HELActions.setLanguage(e.target.value))
    }

    return (
        <div className="language-switcher">
            {/* <Dropdown label="Dropdown" inline onSelect={change} className='dark:text-slate-500'>
                <Dropdown.Item value='en'>English</Dropdown.Item>
                <Dropdown.Item value='hi'>हिन्दी</Dropdown.Item>
            </Dropdown> */}
            <div className="flex items-center space-x-2">
                <select value={router.locale} onChange={change}
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-none focus:outline-none dark:border-gray-600 rounded-md px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                </select>
            </div>
            {/* <select
                value={locale}
                onChange={(e) => changeLocale(e.target.value)}
                aria-label="Select language"
            >
                {locales.map((loc: any) => (
                    <option key={loc} value={loc}>
                        {loc.toUpperCase()}
                    </option>
                ))}
            </select> */}
        </div>
    );
};

export default LanguageSwitcher;