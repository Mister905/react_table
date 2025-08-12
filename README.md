# React Table Take-Home Assignment

A React + TypeScript project demonstrating a responsive, sortable, and draggable table using **@tanstack/react-table**, **Redux Toolkit**, **Materialize CSS**, **Day.js**, and **@dnd-kit**.

This project was built as a take-home assignment and includes features such as column sorting, pagination, and column reordering via drag-and-drop.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Functionality Considerations](#functionality-considerations)
- [Future Improvements](#future-improvements)

---

## Features

- **Sortable Columns:** Click any header to toggle ascending/descending order. Sorting applies to visible rows locally.
- **Pagination:** Navigate through pages of user data with first/prev/next/last buttons.
- **Column Reordering:** Drag and drop headers to rearrange columns using a separate drag handle, avoiding conflicts with sorting clicks.
- **Responsive UI:** Styled with Materialize CSS; mobile-friendly.
- **Global State:** User data managed in Redux for consistency; table interactions remain local.
- **Sample Data Generation:** Faker.js generates 500+ sample users for testing.
- **Date Formatting:** Day.js formats registration dates and calculates derived fields like DSR (Days Since Registration).

---

## Tech Stack

- **React 18 + TypeScript**
- **@tanstack/react-table** (table logic)
- **Redux Toolkit** (state management)
- **@dnd-kit/core & @dnd-kit/sortable** (drag-and-drop column reordering)
- **Materialize CSS** (UI styling)
- **Day.js** (date formatting)
- **Faker.js** (sample data generation)
- **FontAwesome** (icons)
- **SCSS / index.scss** (global styling overrides)

---

## Project Structure

```
react_table/
├─ src/
│ ├─ components/
│ │ ├─ Table.tsx # Main table; local state for sorting, pagination, column order
│ │ └─ SortableColumn.tsx # Drag-and-drop column header with sorting toggle
│ ├─ hooks.ts # Typed Redux hooks
│ ├─ reducers/
│ │ └─ usersReducer.ts # Async thunk to load or generate users
│ ├─ store.ts # Redux store setup
│ ├─ types.ts # Type definitions for User
│ ├─ App.tsx # Dispatches user loading thunk and defines columns
│ ├─ main.tsx # Wraps App in Redux Provider
│ └─ index.scss # Global SCSS styling
├─ .env # LocalStorage keys
└─ package.json
```

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Mister905/react_table.git
   cd react_table
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

4. Open in your browser at `http://localhost:5173` (default Vite port).

---

## Usage

- Columns can be **sorted** by clicking the headers.
- **Pagination controls** are located below the table.
- **Drag-and-drop headers** to reorder columns interactively.
- User data is generated automatically using Faker.js if localStorage is empty.

---

## Functionality Considerations

- **Infinite / Virtual Scroll:** Currently renders all rows; for larger datasets, virtualization with `react-window` or `react-virtual` would improve performance.
- **Column Reordering:** Fully functional with @dnd-kit; drag handle is separate from sorting click to prevent conflicts.
- **Sorting:** Local row sorting is implemented; server-side sorting could be added for large datasets.
- **State Management:** Redux stores the global dataset; table interactions remain local to optimize responsiveness.

---

## License

This project is for demonstration purposes and does not have a license.
