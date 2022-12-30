/* eslint-disable max-len */
// eslint-disable-next-line no-use-before-define
import React from "react";
import { Typography, Box } from "@material-ui/core";

function Dashboard() {
  return (
    <div>
      <Box fontSize={20} fontWeight={300} textAlign="center" mb={5}>
        React Sortly is a simple, lightweight and highly customizable dnd nested sortable React component.
        <br />
        Supported to sort the tree, vertical list, horizontal list, table row and maybe more!
      </Box>
      <Typography variant="h4">Installation</Typography>
      <Box p={2} bgcolor="grey.200" borderRadius={2} color="secondary.main">
        <Typography>npm install --save react-sortly react-dnd react-dnd-html5-backend immutability-helper memoize-one</Typography>
      </Box>
      Or
      <Box p={2} bgcolor="grey.200" borderRadius={2} color="secondary.main">
        <Typography>yarn add react-sortly react-dnd react-dnd-html5-backend immutability-helper memoize-one</Typography>
      </Box>
    </div>
  );
}

export default Dashboard;
