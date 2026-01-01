
# Workflow Builder UI 🚀

A high-performance, interactive visual workflow editor built from scratch. This application allows users to design complex logic trees with Actions and Conditions using a clean, recursive UI.

**Built as a Frontend Intern Take-Home Assignment.**

🔴 **Live Demo:** [https://emitrr-assignment-nine.vercel.app/](https://emitrr-assignment-nine.vercel.app/)

---

## 📋 Project Overview

The objective was to engineer a simplified version of tools like **React Flow** or **Zapier**, but **without using any external diagramming or UI libraries**.

Unlike a standard list-based app, this project manages a **Graph Data Structure**, handles recursive component rendering for nested branches, and implements robust state management for features like **Undo/Redo** and **Tree Traversal**.

---

## ✨ Key Features

### 🎨 Visual Flowcharting
- **Distinct Node Shapes:** Renders **Start/End** (Ovals), **Actions** (Rectangles), and **Conditions** (Diamonds) using pure CSS.
- **Recursive Rendering:** Capable of rendering infinite levels of nested branches.
- **Auto-Branching:** Adding a "Condition" node automatically splits the flow into **"True"** and **"False"** paths.

### 🧠 Smart Interactions
- **Context-Sensitive Creation:** A custom pop-over menu appears on connection lines to insert nodes exactly where needed.
- **Auto-Healing Deletion:** Deleting a node intelligently connects its parent to its child, ensuring the workflow flow is never broken.
- **Inline Editing:** Click any node label to rename it instantly.

### 🏆 Bonus Features Implemented
- **↺ Undo/Redo System:** Full history stack implementation allows users to travel backward and forward through structural changes.
- **💾 Save State:** A "Save JSON" button serializes the current tree structure and logs it to the console for persistence testing.
- **✨ TypeScript Strictness:** Fully typed codebase with `verbatimModuleSyntax` for robust development.

---

## 🛠️ Tech Stack

- **Framework:** React 18 (Vite)
- **Language:** **TypeScript** (Strict Mode)
- **Styling:** Pure CSS3 (CSS Variables, Flexbox, Pseudo-elements for shapes)
- **State Management:** Custom Hook (`useWorkflow`) with History Stack
- **Icons:** Native text/CSS shapes (No heavy icon libraries)

---

## 🧠 Architectural Decisions

### 1. Normalized Data Structure (The "Flat" Store)
Instead of a deeply nested object (which makes updates slow and complex), the state is flattened like a database table.
```typescript
// O(1) Lookup Speed
type WorkflowNodes = Record<string, NodeData>;

```

This allows for instant updates and easier logic when moving or deleting nodes.

### 2. Recursive Component Pattern

The UI uses a recursive strategy where `<WorkflowNode />` renders itself for its children. This leverages the DOM's natural layout engine (Flexbox) to handle the tree structure without complex absolute positioning math.

### 3. CSS-Only Shapes

The "Diamond" shape for conditions is created using a rotated `::before` pseudo-element, while the text container remains un-rotated. This ensures the text is always readable without using SVG or Images.

---

## ⚙️ Installation & Running Locally

1. **Clone the repository**
```bash
git clone [https://github.com/YashMalik/emitrr-assignment.git](https://github.com/YashMalik/emitrr-assignment.git)
cd emitrr-assignment

```


2. **Install dependencies**
```bash
npm install

```


3. **Start the development server**
```bash
npm run dev

```


4. Open `http://localhost:5173` in your browser.

---

## 📂 Project Structure

A clean, modular architecture separating logic from presentation:

```
src/
├── components/
│   ├── NodeCard.tsx       # Handles the Visual Shapes (Diamond/Oval)
│   ├── AddNodeButton.tsx  # The interactive "+" popover menu
│   └── WorkflowNode.tsx   # Recursive Logic Component
├── hooks/
│   └── useWorkflow.ts     # Core Engine (Undo/Redo, CRUD Logic)
├── initialData.ts         # Type definitions & Initial State
├── App.css                # Global Styles & Grid Background
└── App.tsx                # Main Layout & Toolbar

```

---

## ✅ Assignment Requirements Checklist

| Requirement | Status | Implementation |
| --- | --- | --- |
| **No UI Libraries** | ✅ | Pure CSS & HTML |
| **Data Modeling** | ✅ | Normalized JSON Graph |
| **Node Types** | ✅ | Start, Action, Branch, End |
| **Visual Connections** | ✅ | CSS Borders & Layouts |
| **Add/Delete/Edit** | ✅ | Fully Interactive |
| **Undo/Redo (Bonus)** | ✅ | History Stack Implemented |
| **Save to JSON (Bonus)** | ✅ | Console Logging |
| **Context Menu (Bonus)** | ✅ | Custom Hover Popover |

---

### 👤 Author

**Yash Malik**
*Frontend Engineer Intern Applicant*


