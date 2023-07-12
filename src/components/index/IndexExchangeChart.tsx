"use client"
import LineChart from '@/components/charts/LineChart';
import { CoinActionEnum, ExchangePayloadI } from '@/interfaces/exchanges/exchange.interface';
import { setExchanges } from '@/redux/exchange/exchange.slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Socket from '@/utils/socket/socket';
import { useEffect, useState } from 'react';

interface IState {
    labels: string[];
    dataItems: number[];
}

const IndexExchangeChart = () => {
    const exchanges = useAppSelector((state) => state.exchange.exchanges);

    const [chartData, setChartData] = useState<IState>({
        labels: [],
        dataItems: []
    });

    const { labels, dataItems } = chartData;

    const dispatch = useAppDispatch();

    useEffect(() => {
        const exchangeSocket = new Socket()

        exchangeSocket.connect(`${process.env.NEXT_PUBLIC_BITMEX_SOCKET_URL}`)

        exchangeSocket.onOpen(() => {
            exchangeSocket.sendMessage({ "op": "subscribe", "args": ["orderBookL2_25:XBTUSD"] })
        })

        setInterval(() => {
            exchangeSocket.onMessage((response: ExchangePayloadI) => {
                if (response.action && Object.keys(CoinActionEnum).includes(response.action)) {
                    dispatch(setExchanges(response.data.map((item) => {
                        return {
                            ...item,
                            action: response.action,
                        }
                    })))
                    setTimeout(() => exchangeSocket.onMessage(() => {}), 10)
                }
            })
        }, 5000)

        return () => {
            exchangeSocket.disconnect()
        }
    }, [])

    useEffect(() => {
        const labels = exchanges.map((exchange) => exchange.action.toString());
        const dataItems = exchanges.map((exchange) => exchange.price);

        setChartData({
            labels,
            dataItems
        })
    }, [exchanges])

    return (
        <LineChart mainLabel='XBTUSD' labels={labels} dataItems={dataItems} />
    )
}

export default IndexExchangeChart;