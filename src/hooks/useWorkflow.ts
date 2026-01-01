import { useState } from "react";
// ADD 'type' HERE
import type { WorkflowNodes, NodeType, NodeData } from "../initialData";
import { initialData } from "../initialData";

// Re-export types so components can use them from here
export type { WorkflowNodes, NodeType, NodeData };

export const useWorkflow = () => {
  // --- STATE: HISTORY STACK FOR UNDO/REDO ---
  const [history, setHistory] = useState<WorkflowNodes[]>([initialData]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // The current view is always the node set at the current index
  const nodes = history[currentIndex];

  // Helper to push new state to history
  const updateHistory = (newNodes: WorkflowNodes) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newNodes);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  // --- ACTIONS ---

  const addNode = (parentId: string, type: NodeType) => {
    const newId = Math.random().toString(36).substr(2, 9);
    const parent = nodes[parentId];

    const newNode: NodeData = {
      id: newId,
      type,
      label:
        type === "condition"
          ? "Condition Check"
          : type === "end"
          ? "End"
          : "New Action",
      parentId: parentId,
      children: [],
    };

    let nextNodes = { ...nodes, [newId]: newNode };

    // Bonus: Auto-create branches for conditions
    if (type === "condition") {
      const trueId = Math.random().toString(36).substr(2, 9);
      const falseId = Math.random().toString(36).substr(2, 9);

      nextNodes[trueId] = {
        id: trueId,
        type: "placeholder",
        label: "True",
        parentId: newId,
        children: [],
      };
      nextNodes[falseId] = {
        id: falseId,
        type: "placeholder",
        label: "False",
        parentId: newId,
        children: [],
      };
      newNode.children = [trueId, falseId];
    } else if (parent.children.length > 0) {
      // Insert in between
      const existingChildId = parent.children[0];
      newNode.children = [existingChildId];
      nextNodes[existingChildId] = {
        ...nextNodes[existingChildId],
        parentId: newId,
      };
    }

    // Update Parent
    if (parent.type === "condition" || parent.type === "placeholder") {
      nextNodes[parentId] = {
        ...parent,
        children: [...parent.children, newId],
      };
    } else {
      nextNodes[parentId] = { ...parent, children: [newId] };
    }

    updateHistory(nextNodes);
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === "start") return;
    const node = nodes[nodeId];
    const parent = nodes[node.parentId!];
    const nextNodes = { ...nodes };

    // Smart Reconnect Logic
    const childToKeep = node.children[0];
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
    updateHistory(nextNodes);
  };

  const updateLabel = (id: string, newLabel: string) => {
    const nextNodes = { ...nodes, [id]: { ...nodes[id], label: newLabel } };
    updateHistory(nextNodes);
  };

  // --- BONUS FEATURES IMPLEMENTATION ---

  const undo = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const redo = () => {
    if (currentIndex < history.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const saveWorkflow = () => {
    console.log(
      "%c Workflow Saved! ",
      "background: #222; color: #bada55",
      JSON.stringify(nodes, null, 2)
    );
    alert("Workflow structure saved to Console (F12)!");
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
