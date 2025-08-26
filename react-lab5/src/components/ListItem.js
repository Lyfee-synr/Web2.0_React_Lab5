import React from "react";

// ListItem wrapped with React.memo
const ListItem = React.memo(function ListItem({ item, onDelete }) {
  console.log(`Rendering item: ${item.text}`); // debug to check re-renders
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <span>{item.text}</span>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  );
});

export default ListItem;
