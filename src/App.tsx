import { useWorkflow } from "./hooks/useWorkflow";
import { WorkflowNode } from "./components/WorkflowNode";
import "./App.css";

function App() {
  const {
    nodes,
    addNode,
    deleteNode,
    updateLabel,
    undo,
    redo,
    saveWorkflow,
    canUndo,
    canRedo,
  } = useWorkflow();

  return (
    <div className="app">
      {/* 1. Floating Top Toolbar */}
      <div className="toolbar">
        <button onClick={undo} disabled={!canUndo}>
          ↩ Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo ↪
        </button>
        <button onClick={saveWorkflow} className="save-btn">
          Save JSON
        </button>
      </div>

      {/* 2. Canvas Area */}
      <div className="canvas">
        <WorkflowNode
          id="start"
          nodes={nodes}
          onAdd={addNode}
          onDelete={deleteNode}
          onEdit={updateLabel}
        />
      </div>

      {/* 3. Floating Bottom Footer (Name) */}
      <div className="footer-badge">
        <span>Developed by</span>
        <strong>Yash Malik (22BCE11191)</strong>
      </div>
    </div>
  );
}

export default App;
