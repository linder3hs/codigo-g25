import { useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, FunnelX } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-5">
        <Input
          placeholder="Busqueda global"
          value={globalFilter}
          className="max-w-sm"
          onChange={(event) => setGlobalFilter(event.target.value)}
        />
        {(globalFilter || columnFilters.length > 0) && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    setGlobalFilter("");
                    setColumnFilters([]);
                  }}
                >
                  <FunnelX />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Limpiar filtros</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 font-semibold text-gray-700 tracking-wider"
                  >
                    <div className="space-y-2">
                      <div
                        className="flex items-center gap-1"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronUp className="w-4 h-4" />
                        )}
                      </div>
                      {header.column.getCanFilter() && (
                        <div>
                          <Input
                            className="h-7 text-xs"
                            placeholder="Buscar..."
                            value={header.column.getFilterValue() ?? ""}
                            onChange={(event) => {
                              header.column.setFilterValue(event.target.value);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-gray-800">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
