import React from "react";
import type { WorkflowNodes, NodeType } from "../hooks/useWorkflow";
import { NodeCard } from "./NodeCard";
import { AddNodeButton } from "./AddNodeButton";

interface Props {
  id: string;
  nodes: WorkflowNodes;
  onAdd: (id: string, type: NodeType) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, label: string) => void;
}

export const WorkflowNode: React.FC<Props> = ({
  id,
  nodes,
  onAdd,
  onDelete,
  onEdit,
}) => {
  const node = nodes[id];
  if (!node) return null;

  return (
    <div
      className={`node-wrapper ${
        node.type === "placeholder" ? "placeholder-wrapper" : ""
      }`}
    >
      {/* Render the Card (or True/False Label) */}
      {node.type !== "placeholder" && (
        <div className="line-down top-line"></div>
      )}
      <NodeCard node={node} onDelete={onDelete} onEdit={onEdit} />

      {/* Render Add Button if leaf node */}
      {node.children.length === 0 && node.type !== "end" && (
        <AddNodeButton parentId={id} onAdd={onAdd} />
      )}

      {/* Recursive Children */}
      {node.children.length > 0 && (
        <>
          <div className="line-down"></div>
          <div
            className={`children-container ${
              node.type === "condition" ? "horizontal" : "vertical"
            }`}
          >
            {node.type === "condition" && node.children.length > 1 && (
              <div className="branch-bar"></div>
            )}
            {node.children.map((childId) => (
              <WorkflowNode
                key={childId}
                id={childId}
                nodes={nodes}
                onAdd={onAdd}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
