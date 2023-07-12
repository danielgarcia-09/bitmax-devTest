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
      action: capitalize(exchange.action),
      symbol: exchange.symbol,
      price: exchange.price,
      side: exchange.side,
      size: exchange.size || "N/A",
      timestamp: new Date(exchange.timestamp).toLocaleString(),
    }
  })

  return (
    <Table layout='fixed' columns={tableColumns} data={exchangeData} customStyles={{ td: `` }} />
  )
}

export default IndexExchangeTable;