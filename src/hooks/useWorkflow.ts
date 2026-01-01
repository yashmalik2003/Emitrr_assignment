import { useState } from "react";

// --- TYPES ---
export type NodeType = "start" | "action" | "condition" | "end";

export interface NodeData {
  id: string;
  type: NodeType;
  label: string;
  parentId: string | null;
  children: string[];
}

export type WorkflowNodes = Record<string, NodeData>;

// --- INITIAL STATE ---
const INITIAL_NODES: WorkflowNodes = {
  start: {
    id: "start",
    type: "start",
    label: "Start",
    parentId: null,
    children: [],
  },
};

export const useWorkflow = () => {
  // History Stack for Undo/Redo (Bonus Point)
  const [history, setHistory] = useState<WorkflowNodes[]>([INITIAL_NODES]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nodes = history[currentIndex];

  // Helper to commit changes to history
  const updateNodes = (newNodes: WorkflowNodes) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newNodes);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  // --- ACTIONS ---

  const addNode = (parentId: string, type: NodeType) => {
    const newId = crypto.randomUUID();
    const parent = nodes[parentId];

    // Create the new node
    const newNode: NodeData = {
      id: newId,
      type,
      label:
        type === "condition" ? "Condition" : type === "end" ? "End" : "Action",
      parentId: parentId,
      children: [],
    };

    const nextNodes = { ...nodes, [newId]: newNode };

    // Logic: Insert into flow (Requirement: Maintain Continuous Flow)
    if (parent.children.length > 0 && type !== "condition") {
      const existingChildId = parent.children[0];
      newNode.children = [existingChildId];
      nextNodes[existingChildId] = {
        ...nextNodes[existingChildId],
        parentId: newId,
      };
    }

    // Update parent to point to new node
    if (parent.type === "condition") {
      nextNodes[parentId] = {
        ...parent,
        children: [...parent.children, newId],
      };
    } else {
      nextNodes[parentId] = { ...parent, children: [newId] };
    }

    updateNodes(nextNodes);
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === "start") return; // Cannot delete root

    const node = nodes[nodeId];
    const parent = nodes[node.parentId!];
    const nextNodes = { ...nodes };

    // Reconnect Logic: Parent adopts the deleted node's first child
    const childToKeep = node.children[0];

    // Update parent's children array
    const newParentChildren = parent.children.filter((id) => id !== nodeId);
    if (childToKeep) {
      newParentChildren.push(childToKeep);
      nextNodes[childToKeep] = {
        ...nextNodes[childToKeep],
        parentId: parent.id,
      };
    }

    nextNodes[parent.id] = { ...parent, children: newParentChildren };
    delete nextNodes[nodeId];

    updateNodes(nextNodes);
  };

  const updateLabel = (id: string, newLabel: string) => {
    const nextNodes = { ...nodes };
    nextNodes[id] = { ...nextNodes[id], label: newLabel };
    updateNodes(nextNodes);
  };

  // Bonus: Undo/Redo
  const undo = () => currentIndex > 0 && setCurrentIndex((curr) => curr - 1);
  const redo = () =>
    currentIndex < history.length - 1 && setCurrentIndex((curr) => curr + 1);

  // Bonus: Save
  const saveWorkflow = () => {
    console.log("Workflow Saved:", JSON.stringify(nodes, null, 2));
    alert("Workflow Data logged to console (F12)!");
  };

  return {
    nodes,
    addNode,
    deleteNode,
    updateLabel,
    undo,
    redo,
    saveWorkflow,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
  };
};
