import React, { useState } from "react";
import type { NodeType } from "../hooks/useWorkflow";

interface Props {
  parentId: string;
  onAdd: (id: string, type: NodeType) => void;
}

export const AddNodeButton: React.FC<Props> = ({ parentId, onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="add-connection">
      <div className="line-fragment"></div>
      <button className="add-trigger" onClick={() => setIsOpen(!isOpen)}>
        +
      </button>

      {isOpen && (
        <div className="popover-menu" onMouseLeave={() => setIsOpen(false)}>
          <button
            onClick={() => {
              onAdd(parentId, "action");
              setIsOpen(false);
            }}
          >
            Action
          </button>
          <button
            onClick={() => {
              onAdd(parentId, "condition");
              setIsOpen(false);
            }}
          >
            Condition
          </button>
          <button
            onClick={() => {
              onAdd(parentId, "end");
              setIsOpen(false);
            }}
          >
            End
          </button>
        </div>
      )}
    </div>
  );
};
