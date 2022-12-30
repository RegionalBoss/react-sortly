import React from "react";
import Connectable from "./types/Connectable";
import ID from "./types/ID";

type ItemContext = {
  index: number;
  id: ID;
  type: string | symbol;
  depth: number;
  data: Record<string, unknown>;
  onHoverBegin: (id: ID, connectedDropTarget?: React.MutableRefObject<Connectable | undefined>) => void;
  onHoverEnd: (id: ID) => void;
};

// @ts-ignore
const context = React.createContext<ItemContext>({});

export default context;
