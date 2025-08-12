import React, { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableColumn from "./SortableColumn"; // your drag-sortable header

import type { User } from "../types";

interface TableProps {
  columns: ColumnDef<User>[];
  data: User[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((col) => col.id || (col.accessorKey as string))
  );

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination, columnOrder },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setColumnOrder((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = prev.indexOf(over.id as string);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="p-4">
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={columnOrder}
          strategy={horizontalListSortingStrategy}
        >
          <table className="highlight">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <SortableColumn key={header.id} header={header} />
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>

      {/* Pagination Controls */}
      <div className="center-align pagination-wrapper">
        <button
          className="btn"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} /> First
        </button>
        <button
          className="btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <FontAwesomeIcon icon={faAngleLeft} /> Prev
        </button>
        <span className="pagination-span">
          Page <strong>{table.getState().pagination.pageIndex + 1}</strong> of{" "}
          {table.getPageCount()}
        </span>
        <button
          className="btn"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button
          className="btn"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last <FontAwesomeIcon icon={faAngleDoubleRight} />
        </button>
      </div>
    </div>
  );
};

export default Table;
