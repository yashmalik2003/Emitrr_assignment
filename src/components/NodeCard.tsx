import React from "react";
import type { NodeData } from "../initialData";

interface Props {
  node: NodeData;
  onDelete: (id: string) => void;
  onEdit: (id: string, val: string) => void;
}

export const NodeCard: React.FC<Props> = ({ node, onDelete, onEdit }) => {
  if (node.type === "placeholder") {
    return (
      <div className={`path-label label-${node.label.toLowerCase()}`}>
        {node.label}
      </div>
    );
  }

  // NOTE: The class `type-${node.type}` is what matches the CSS above!
  return (
    <div className={`node-card type-${node.type}`}>
      <div className="node-type-label">{node.type.toUpperCase()}</div>

      <input
        value={node.label}
        onChange={(e) => onEdit(node.id, e.target.value)}
        readOnly={node.type === "start"}
      />

      {node.type !== "start" && node.type !== "end" && (
        <button className="delete-btn" onClick={() => onDelete(node.id)}>
          ✕
        </button>
      )}
    </div>
  );
};
