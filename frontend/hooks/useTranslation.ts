import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Import all translation files
import en from '../locales/en.json';
import hi from '../locales/hi.json';

const translations = {
    en,
    hi
};

export const useTranslation = () => {
    const router = useRouter();
    const { locale, asPath } = router;
    const [translations, setTranslations] = useState<Record<string, any>>({});

    useEffect(() => {
        const loadTranslations = async () => {
            // This would be a dynamic import in a real application
            // Here we're simulating it with a switch for simplicity
            let translationData;
            switch (locale) {
                case 'hi':
                    translationData = (await import('../locales/hi.json')).default;
                    break;
                default:
                    translationData = (await import('../locales/en.json')).default;
            }
            setTranslations(translationData);
        };

        loadTranslations();
    }, [locale]);

    const t = (key: any) => {
        // Split the key by dots to navigate the nested translation object
        const keys = key.split('.');
        let value: any = translations;

        // Navigate through the keys
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // Return the key if translation not found
                return key;
            }
        }

        return value;
    };

    // Function to replace variables in translated strings
    const formatString = (text: any,) => {
        // if (!variables) return text;
        let formattedText = text;

        // Object.entries(variables).forEach(([key, value]) => {
        //     formattedText = formattedText.replace(new RegExp(`{{${key}}}`, 'g'), value);
        // });

        return formattedText;
    };

    // Enhanced translate function with variable support
    const translate = (key: any) => {
        const text = t(key);
        return formatString(text)
    };

    // Function to change the locale
    const changeLocale = (newLocale: any) => {
        router.push(asPath, asPath, { locale: newLocale });
    };

    return {
        t: translate,
        locale,
        changeLocale,
        locales: router.locales || ['en', 'fr', 'es', 'de'],
    };
};