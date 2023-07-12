import { capitalize } from '@/utils/string/string';
import { v4 as uuid } from 'uuid';

interface ColumnProps {
    title: string;
}

interface TableProps<T = any> {
    layout: 'fixed' | 'auto';
    data: T[];
    columns: ColumnProps[];
    customStyles?: {
        td?: string;
    };
}

const Table = (props: TableProps) => {

    const { layout, data, columns } = props;

    return (
        <div className="bg-white flex flex-col w-5/6 overflow-x-auto lg:overflow-x-hidden lg:w-full drop-shadow-lg border rounded-md">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
                    <div className="px-4">
                        <table className={`table-${layout} min-w-full text-left`}>
                            <thead className='bg-sky-500 font-medium'>
                                <tr>
                                    {columns.map((column) => (
                                        <th scope='col' key={uuid()} className='px-6 py-4'>{capitalize(column.title)}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={uuid()} className='border-b'>
                                        {Object.keys(item).map((key) => (
                                            <td key={key} className='whitespace-nowrap px-6 py-4 font-medium'>{item[key]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table;