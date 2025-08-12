import React from "react";
import { type Header, flexRender } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripLines,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

interface SortableColumnProps {
  header: Header<any, any>;
}

const SortableColumn: React.FC<SortableColumnProps> = ({ header }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: header.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "default",
  };

  const isSorted = header.column.getIsSorted();

  return (
    <th ref={setNodeRef} style={style}>
      {/* Drag handle */}
      <span
        {...attributes}
        {...listeners}
        style={{ cursor: "grab", marginRight: "6px" }}
      >
        <FontAwesomeIcon icon={faGripLines} />
      </span>

      {/* Clickable header for sorting */}
      <span
        onClick={header.column.getToggleSortingHandler()}
        style={{ userSelect: "none", marginLeft: "4px" }}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {isSorted === "asc" && (
          <FontAwesomeIcon icon={faSortUp} style={{ marginLeft: "4px" }} />
        )}
        {isSorted === "desc" && (
          <FontAwesomeIcon icon={faSortDown} style={{ marginLeft: "4px" }} />
        )}
      </span>
    </th>
  );
};

export default SortableColumn;
