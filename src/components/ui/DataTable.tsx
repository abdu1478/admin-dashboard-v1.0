import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "./table"

interface DataTableProps {
    columns: {
      header: string;
      accessor: string;
      isCurrency?: boolean;
    }[];
    data: any[];
    isLoading?: boolean;
  }
  
  function DataTable({ columns, data, isLoading, ...props }: DataTableProps & React.ComponentProps<typeof Table>) {
    return (
      <Table {...props}>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessor}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.accessor}>
                  {column.isCurrency ? `$${item[column.accessor]}` : item[column.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  export { DataTable }