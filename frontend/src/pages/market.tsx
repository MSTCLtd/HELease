import CommonMaster from '@/layouts/CommonMaster'
// import { MultiList, ReactiveBase, ReactiveList, SearchBox } from '@appbaseio/reactivesearch'
import { SearchBox, ErrorBoundary, Facet, Sorting, PagingInfo, ResultsPerPage, Paging, SearchProvider, WithSearch, Results } from '@elastic/react-search-ui'
import React from 'react'
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { Layout } from "@elastic/react-search-ui-views";
import MarketMaster from '@/layouts/MarketMaster';
import { SearchResult } from '@elastic/search-ui';
import { Card } from 'flowbite-react';

const CustomResultView = ({ result, onClickLink }: { result: SearchResult, onClickLink: () => void }) => (
    <Card href={result.url.raw} onClick={onClickLink} className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{result.title.raw}</h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">{result.plot.raw}</p>
    </Card>
    // <li className="sui-result">
    //     <div className="sui-result__header">
    //         <h3>
    //             {/* Maintain onClickLink to correct track click throughs for analytics*/}
    //             <a onClick={onClickLink} href={result.nps_link.raw}>
    //                 {result.title.snippet}
    //             </a>
    //         </h3>
    //     </div>
    //     <div className="sui-result__body">
    //         {/* use 'raw' values of fields to access values without snippets */}
    //         <div className="sui-result__image">
    //             <img src={result.image_url.raw} alt="" />
    //         </div>
    //         {/* Use the 'snippet' property of fields with dangerouslySetInnerHtml to render snippets */}
    //         <div
    //             className="sui-result__details"
    //             dangerouslySetInnerHTML={{ __html: result.description.snippet }}
    //         ></div>
    //     </div>
    // </li>
);

const CustomLayout = ({ bodyHeader, sideContent, bodyContent, bodyFooter }: { bodyHeader: any, sideContent: any, bodyContent: any, bodyFooter: any }) => {
    return (
        <div className="w-full bg-gray-50 dark:bg-gray-800 antialiased px-4">
            <div className='grid grid-cols-5 gap-2'>
                <aside className="col-span-1 hidden lg:block">
                    <div className="p-4 dark:text-white">
                        <h2 className="text-lg font-semibold">Filters</h2>
                        {sideContent}
                    </div>
                </aside>

                <main className="col-span-4">
                    <div className='my-2'>
                        {bodyHeader}
                    </div>
                    {bodyContent}
                    <div className='mx-auto w-full'>
                        {bodyFooter}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default function market() {
    return (
        <MarketMaster title='Marketplace'>
            <WithSearch mapContextToProps={({ wasSearched }: (any)) => ({ wasSearched })}>
                {({ wasSearched }: (any)) => {
                    return <ErrorBoundary className='-z-10'>
                        <CustomLayout
                            sideContent={
                                <div>
                                    {wasSearched && <Sorting label={"Sort by"} sortOptions={[]} />}
                                    <Facet key={"1"} field={"genre.keyword"} label={"genre"} />
                                    <Facet key={"2"} field={"actors.keyword"} label={"actors"} />
                                    <Facet key={"3"} field={"directors.keyword"} label={"directors"} />
                                    <Facet key={"4"} field={"released"} label={"released"} />
                                    <Facet key={"5"} field={"imdbRating"} label={"imdb rating"} />
                                </div>
                            }
                            bodyContent={<Results shouldTrackClickThrough={true} resultView={CustomResultView} className='mb-4 gap-2 grid sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4' />}
                            bodyHeader={
                                <React.Fragment>
                                    <div className='flex justify-between'>
                                        {wasSearched && <PagingInfo />}
                                        {wasSearched && <ResultsPerPage />}
                                    </div>
                                </React.Fragment>
                            }
                            bodyFooter={<Paging />}
                        />
                    </ErrorBoundary>
                }}
            </WithSearch>
        </MarketMaster>
    )
}
