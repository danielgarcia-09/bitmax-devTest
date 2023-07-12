"use client"
import { useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';

interface IStats {
    totalPrice: number;
    totalSize: number;
    totalExchanges: number;
}

const IndexTopStats = () => {

    const exchanges = useAppSelector((state) => state.exchange.exchanges);
    const [stats, setStats] = useState<IStats>({
        totalPrice: 0,
        totalSize: 0,
        totalExchanges: 0,
    })

    useEffect(() => {
        const totalPrice = exchanges.reduce((acc, curr) => acc + (curr.price || 0), 0)
        const totalSize = exchanges.reduce((acc, curr) => acc + (curr.size || 0), 0)
        const totalExchanges = stats.totalExchanges + exchanges.length

        setStats({
            totalPrice,
            totalSize,
            totalExchanges,
        })
    }, [exchanges])

    const keysColumns: any = {
        "totalPrice": 'Total Price',
        "totalSize": 'Total Size',
        "totalExchanges": 'Total Exchanges',
    }

    return (

        <div className='flex justify-center md:justify-between items-center flex-wrap rounded-md drop-shadow-md my-8'>
            <h2 className='text-3xl font-semibold mb-5'>Welcome Back!</h2>

            <div className='mx-5 my-5 lg:mx-0 lg:my-0 flex items-center gap-2'>
                {Object.keys(keysColumns).map((key) => (
                    <div key={key} className='flex flex-col items-center mr-5'>
                        <span className='text-sm font-semibold mb-1'>{keysColumns[key]}</span>
                        <span className='text-2xl font-semibold mb-1'>{Number(stats[key as keyof IStats]).toLocaleString('en-US')}</span>
                    </div>
                ))}

            </div>
        </div>

    )
}

export default IndexTopStats;