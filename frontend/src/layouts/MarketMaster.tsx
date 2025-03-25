import MarketNavbar from '@/components/MarketNavbar'
import React, { useEffect } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import ElasticsearchAPIConnector from '@elastic/search-ui-elasticsearch-connector'
import { SearchProvider } from '@elastic/react-search-ui'
import Footer from '@/components/Footer'

export default function MarketMaster({ children, title = "Upkaran" }: { children: React.ReactNode, title: string }) {
    const { t } = useTranslation()
    const router = useRouter()
    const state = useSelector((state: any) => state.HELReducer)

    const connector = new ElasticsearchAPIConnector({
        host: 'https://10.1.13.5:9200',
        apiKey: "Wi1CbXNwVUJHLW9BM2ZyR0t2Wlk6T3M1aFhndDVSXy1fTGJhbVg5WlB1UQ==",
        index: "movies"
    });

    const config = {
        searchQuery: {
            search_fields: {
                title: {
                    weight: 3
                },
                plot: {},
                genre: {},
                actors: {},
                directors: {}
            },
            result_fields: {
                title: {
                    snippet: {}
                },
                plot: {
                    snippet: {}
                },
                url: {
                    snippet: {}
                }
            },
            disjunctiveFacets: ["genre.keyword", "actors.keyword", "directors.keyword"],
            facets: {
                "genre.keyword": { type: "value" },
                "actors.keyword": { type: "value" },
                "directors.keyword": { type: "value" },
                released: {
                    type: "range",
                    ranges: [
                        {
                            from: "2012-04-07T14:40:04.821Z",
                            name: "Within the last 10 years"
                        },
                        {
                            from: "1962-04-07T14:40:04.821Z",
                            to: "2012-04-07T14:40:04.821Z",
                            name: "10 - 50 years ago"
                        },
                        {
                            to: "1962-04-07T14:40:04.821Z",
                            name: "More than 50 years ago"
                        }
                    ]
                },
                imdbRating: {
                    type: "range",
                    ranges: [
                        { from: 1, to: 3, name: "Pants" },
                        { from: 3, to: 6, name: "Mediocre" },
                        { from: 6, to: 8, name: "Pretty Good" },
                        { from: 8, to: 10, name: "Excellent" }
                    ]
                }
            }
        },
        autocompleteQuery: {
            results: {
                resultsPerPage: 5,
                search_fields: {
                    "title.suggest": {
                        weight: 3
                    }
                },
                result_fields: {
                    title: {
                        snippet: {
                            size: 100,
                            fallback: true
                        }
                    },
                    url: {
                        raw: {}
                    }
                }
            },
            suggestions: {
                types: {
                    results: { fields: ["movie_completion"] }
                },
                size: 4
            }
        },
        apiConnector: connector,
        alwaysSearchOnInitialLoad: true
    };

    useEffect(() => {
        if (state.language != 'en') {
            router.locale = state.language
            router.push(router.asPath, router.asPath, { locale: state.language })
        }
    }, [])
    return (
        <>
            <Head>
                <title>{title == t('home.name') ? title : title + ' - ' + t('home.name')}</title>
            </Head>
            <SearchProvider config={config}>
                <MarketNavbar />
                {children}
            </SearchProvider>
            <Footer />
        </>
    )
}
