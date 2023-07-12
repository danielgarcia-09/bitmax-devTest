"use client"
import IndexExchangeChart from '@/components/index/IndexExchangeChart';
import IndexExchangeTable from '@/components/index/IndexExchangeTable';
import IndexTopStats from '@/components/index/IndexTopStats';

const Home = () => {
  return (
    <>
      <section className='w-5/6 mx-auto mt-12 mb-8'>
        <IndexTopStats />
        <main className="flex min-h-screen flex-col items-center gap-6 justify-between">
          <IndexExchangeChart />
          <IndexExchangeTable />
        </main>
      </section>
    </>
  )
}

export default Home;