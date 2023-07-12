"use client"
import AnnouncementGrid from "@/components/announcements/AnnouncementGrid";
import SearchForm from "@/components/search/SearchForm";
import Head from "next/head";

const SearchPage = () => {
    return (
        <>
            <Head>
                <title>Search Announcements</title>
            </Head>
            <section className='w-5/6 mx-auto mt-12 mb-8'>

                <h1 className="text-4xl font-bold my-16">Search for announcements.</h1>

                <main className="flex min-h-screen flex-col items-center gap-1">

                    <SearchForm />
                    <AnnouncementGrid />
                </main>
            </section>
        </>
    )
}

export default SearchPage;