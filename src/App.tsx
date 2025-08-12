import React, { useEffect } from "react";
import Table from "./components/Table";
import type { User } from "./types";
import { useAppSelector, useAppDispatch } from "./hooks";
import { loadOrGenerateUsers } from "./reducers/usersReducer";
import type { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import Preloader from "./components/Preloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadOrGenerateUsers());
  }, [dispatch]);

  if (loading) return <Preloader />;

  if (error)
    return (
      <div className="error-container">
        <h2 className="error-title">
          <FontAwesomeIcon icon={faTriangleExclamation} /> Oops! Something went
          wrong.
        </h2>
        <p className="error-message">{error}</p>
      </div>
    );

  if (!users || users.length === 0)
    return (
      <div className="error-container">
        <h2 className="error-title">
          <FontAwesomeIcon icon={faTriangleExclamation} /> No users found
        </h2>
        <p className="error-message">
          There are currently no users to display. Please try again later.
        </p>
      </div>
    );

  const columns: ColumnDef<User>[] = [
    { header: "ID", accessorKey: "id" },
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    {
      id: "fullName",
      header: "Full Name",
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    },
    { header: "Email", accessorKey: "email" },
    { header: "City", accessorKey: "city" },
    {
      header: "Registered Date",
      accessorKey: "registeredDate",
      cell: ({ getValue }) =>
        dayjs(getValue() as string).format("MMM DD, YYYY"),
      sortingFn: (a, b, columnId) =>
        dayjs(a.getValue(columnId)).valueOf() -
        dayjs(b.getValue(columnId)).valueOf(),
    },
    {
      id: "dsr",
      header: "DSR",
      accessorFn: (row) => dayjs().diff(dayjs(row.registeredDate), "day"),
      cell: ({ getValue }) => `${getValue()} days`,
      sortingFn: (a, b, columnId) =>
        (a.getValue(columnId) as number) - (b.getValue(columnId) as number),
    },
  ];

  return <Table columns={columns} data={users} />;
};

export default App;
