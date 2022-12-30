import React from "react";
import { useDrag as dndUseDrag, DragSourceHookSpec, ConnectDragSource, ConnectDragPreview } from "react-dnd";

import context from "./context";
import itemContext from "./itemContext";
import Connectable from "./types/Connectable";
import ID from "./types/ID";
import ObjectLiteral from "./types/ObjectLiteral";

export default function useDrag<DragObject extends ObjectLiteral, DropResult, CollectedProps>(
  // @ts-ignore
  spec?: Partial<DragSourceHookSpec<DragObject & { type?: string }, DropResult, CollectedProps>>
): [CollectedProps, ConnectDragSource, ConnectDragPreview] {
  const connectedDragRef = React.useRef<Connectable>();
  const { setDragMonitor, setConnectedDragSource, setInitialDepth } = React.useContext(context);
  const { id, type, depth } = React.useContext(itemContext);
  const [collectedProps, originalDonnectDragSource, connectDragPreview] = dndUseDrag<
    DragObject & { id: ID },
    DropResult,
    CollectedProps & { $isDragging: boolean }
  >({
    ...spec,
    collect: (monitor) => {
      const $isDragging = monitor.isDragging();
      return {
        ...((spec && spec.collect ? spec.collect(monitor) : undefined) as CollectedProps),
        $isDragging,
      };
    },
    isDragging: (monitor) => monitor.getItem().id === id,
    type,
    item: (monitor) => {
      setInitialDepth(depth);
      setDragMonitor(monitor);
      if (spec && spec.item && typeof spec.item === "function") {
        const result = spec.item(monitor);
        if (typeof result === "object") {
          return {
            type,
            ...result,
            id,
          } as unknown as DragObject & { id: ID };
        }
      }
      return { id } as DragObject & { id: ID };
    },
    end(...args) {
      setInitialDepth(undefined);
      setDragMonitor(undefined);

      if (spec && spec.end) {
        spec.end(...args);
      }
    },
  });

  const connectDragSource = (...args: Parameters<typeof originalDonnectDragSource>) => {
    const result = originalDonnectDragSource(...args);
    // @ts-ignore
    connectedDragRef.current = result;
    return result;
  };

  const { $isDragging, ...rest } = collectedProps;

  React.useEffect(() => {
    if ($isDragging) {
      setConnectedDragSource(connectedDragRef);
    }
  }, [$isDragging, setConnectedDragSource]);

  return [
    // @ts-ignore
    rest,
    connectDragSource,
    connectDragPreview,
  ];
}
