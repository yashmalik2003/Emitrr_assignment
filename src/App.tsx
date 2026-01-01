import { useWorkflow } from "./hooks/useWorkflow";
import { WorkflowNode } from "./components/WorkflowNode";
import "./App.css"; // <--- THIS IMPORT IS CRITICAL

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
      <div className="toolbar">
        <button onClick={undo} disabled={!canUndo}>
          ↩ Undo
        </button>
        <button onClick={redo} disabled={!canRedo}>
          Redo ↪
        </button>
        <div style={{ width: 1, height: 20, background: "#e2e8f0" }}></div>
        <button onClick={saveWorkflow} className="save-btn">
          Save JSON
        </button>
      </div>

      <div className="canvas">
        <WorkflowNode
          id="start"
          nodes={nodes}
          onAdd={addNode}
          onDelete={deleteNode}
          onEdit={updateLabel}
        />
      </div>

      <div className="footer-badge">
        Developed by <strong>Yash Malik</strong>
      </div>
    </div>
  );
}

export default App;
