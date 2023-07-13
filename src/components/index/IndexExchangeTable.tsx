import { useAppSelector } from '@/redux/hooks';
import Table from '../table/Table';
import { capitalize } from '@/utils/string/string';

const IndexExchangeTable = () => {

  const exchanges = useAppSelector((state) => state.exchange.exchanges);

  const tableColumns = ["symbol", "action", "price", "size", "side", "date"].map((item) => {
    return {
      title: item
    }
  })

  const exchangeData = exchanges.map((exchange) => {
    return {
      symbol: exchange.symbol,
      action: capitalize(exchange.action),
      price: exchange.price,
      size: exchange.size || "N/A",
      side: exchange.side,
      timestamp: new Date(exchange.timestamp).toLocaleString(),
    }
  })

  return (
    <Table layout='fixed' columns={tableColumns} data={exchangeData} customStyles={{ td: `` }} />
  )
}

export default IndexExchangeTable;