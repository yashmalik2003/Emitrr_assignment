// Define types here to avoid circular dependencies
export type NodeType = "start" | "action" | "condition" | "end" | "placeholder";

export interface NodeData {
  id: string;
  type: NodeType;
  label: string;
  parentId: string | null;
  children: string[];
}

export type WorkflowNodes = Record<string, NodeData>;

// Export the data
export const initialData: WorkflowNodes = {
  start: {
    id: "start",
    type: "start",
    label: "Start Workflow",
    parentId: null,
    children: [],
  },
};
