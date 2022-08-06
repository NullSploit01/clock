import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function PinnedList({ flags }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "#100F0F",
        color: "white",
        position: "relative",
        overflow: "auto",
        maxHeight: 200,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {flags.map((timestamp, idx) => (
        <ListItem key={`${idx}`}>
          <ListItemText primary={`FLAGGED AT -> ${timestamp}`} />
        </ListItem>
      ))}
    </List>
  );
}
