import React, { useState } from "react";
import type { NodeData, WorkflowNodes, NodeType } from "../hooks/useWorkflow";

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
  const [menuOpen, setMenuOpen] = useState(false);

  if (!node) return null;

  return (
    <div className="node-wrapper">
      {/* 1. The Node Card */}
      <div className={`node-card type-${node.type}`}>
        <input
          value={node.label}
          onChange={(e) => onEdit(id, e.target.value)}
          readOnly={node.type === "start"}
        />
        {node.type !== "start" && (
          <div className="delete-btn" onClick={() => onDelete(id)}>
            ✕
          </div>
        )}
      </div>

      {/* 2. Interactive + Button with Pop-over Menu */}
      {node.children.length === 0 && node.type !== "end" && (
        <div className="add-connection">
          <div className="line-fragment"></div>

          {/* The Plus Button */}
          <button
            className="add-trigger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            +
          </button>

          {/* The Menu (Only shows if menuOpen is true) */}
          {menuOpen && (
            <div
              className="popover-menu"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button
                onClick={() => {
                  onAdd(id, "action");
                  setMenuOpen(false);
                }}
              >
                Add Action Step
              </button>
              <button
                onClick={() => {
                  onAdd(id, "condition");
                  setMenuOpen(false);
                }}
              >
                Add Condition (Branch)
              </button>
              <button
                onClick={() => {
                  onAdd(id, "end");
                  setMenuOpen(false);
                }}
              >
                End Workflow
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Children Rendering */}
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
              <div key={childId} className="child-wrapper">
                <WorkflowNode
                  id={childId}
                  nodes={nodes}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
