import { useEffect, useState } from "react";
import "./App.css";
import { flattenData } from "./utils/flat-object";
import { buildTree } from "./utils/build-tree";
import { FlatNode } from "./data/flat-node";
import {
  handleCheckDescendants,
  getDescendants,
} from "./utils/descendants-utils";

import dataJson from "./data.json";
import Checkbox from "./components/Checkbox";

interface CheckboxTreeNode extends FlatNode {
  children: CheckboxTreeNode[];
  checked: boolean;
  indeterminate: boolean;
  expanded: boolean;
}

interface CheckboxTreeProps {
  data: FlatNode[];
  onSave?: () => void;
}

const CheckboxTree: React.FC<CheckboxTreeProps> = ({ data }) => {
  const [treeData, setTreeData] = useState<CheckboxTreeNode[]>(buildTree(data));

  function handleCheckboxChange(node: CheckboxTreeNode): void {
    node.checked = !node.checked;
    handleCheckDescendants(node, treeData);
    handleCheckParent(node);
    setTreeData([...treeData]);
    localStorage.setItem("treeData", JSON.stringify(treeData));
  }

  useEffect(() => {
    const savedData = localStorage.getItem("treeData");
    if (savedData) {
      const data = JSON.parse(savedData) as CheckboxTreeNode[];
      data.forEach((item) => (item.expanded = false));
      setTreeData(data);
    }
  }, []);

  function handleCheckParent(node: CheckboxTreeNode): void {
    const parent = getParent(node);
    if (parent) {
      const children = getDescendants(parent, treeData);
      parent.checked = children.every((child) => child.checked);
      parent.indeterminate =
        children.some((child) => child.checked) && !parent.checked;
      handleCheckParent(parent);
    }
  }

  function getParent(childNode: CheckboxTreeNode): CheckboxTreeNode | null {
    if (childNode.level === 0) {
      return null;
    }

    const startIndex = treeData.findIndex(
      (flattenNode) => flattenNode.id === childNode.id
    );

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = treeData[i];
      if (currentNode.level < childNode.level) {
        return currentNode;
      }
    }
    return null;
  }

  function renderTreeNodes(nodes: CheckboxTreeNode[]): JSX.Element[] {
    return nodes.map((node) => (
      <div
        style={{
          justifyContent: "space-between",
          marginLeft: `${node.level * 20}px`,
        }}
        key={node.id}
      >
        <div
          style={{
            display: node.expanded || node.level === 0 ? "flex" : "none",
            alignItems: "center",
          }}
        >
          <Checkbox
            name="node"
            label={node.name}
            onChange={() => handleCheckboxChange(node)}
            checked={node.checked}
            indeterminate={node.indeterminate}
          />
          {getDescendants(node, treeData).length > 0 && (
            <button
              onClick={() => {
                const desc = getDescendants(node, treeData);
                console.log(node.expanded);
                desc.forEach((cNode) => {
                  cNode.expanded = !cNode.expanded;
                });
                setTreeData([...treeData]);
              }}
              style={{ marginLeft: "10px" }}
            >
              +
            </button>
          )}
        </div>
        {node.children.length > 0 && renderTreeNodes(node.children)}
      </div>
    ));
  }

  return <div>{renderTreeNodes(treeData)}</div>;
};

function App() {
  const flattenedData = flattenData(dataJson);

  return (
    <>
      <div>
        <h1>🌲</h1>
        <h1>React Tree App</h1>
        <CheckboxTree data={flattenedData} />
      </div>
    </>
  );
}

export default App;
