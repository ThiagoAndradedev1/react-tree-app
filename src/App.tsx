import { useState } from "react";
import "./App.css";
import { flattenData } from "./utils/flat-object";
import { FlatPerson } from "./data/flat-person";

import dataJson from "./data.json";
import Checkbox from "./components/Checkbox";

interface CheckboxTreeNode extends FlatPerson {
  children: CheckboxTreeNode[];
  checked: boolean;
  indeterminate: boolean;
  expanded: boolean;
}

interface CheckboxTreeProps {
  data: FlatPerson[];
  onSave?: () => void;
}

function buildTree(flatData: FlatPerson[]): CheckboxTreeNode[] {
  const treeMap = new Map<string, CheckboxTreeNode>();
  const rootNodes: CheckboxTreeNode[] = [];

  flatData.forEach((item) => {
    const node: CheckboxTreeNode = {
      ...item,
      children: [],
      checked: false,
      indeterminate: false,
    };
    treeMap.set(item.id, node);
    const parent = treeMap.get(item.id.substring(0, item.id.length - 2));
    if (parent) {
      parent.children.push(node);
    } else {
      rootNodes.push(node);
    }
  });

  return rootNodes;
}

const CheckboxTree: React.FC<CheckboxTreeProps> = ({ data }) => {
  const [treeData, setTreeData] = useState<CheckboxTreeNode[]>(buildTree(data));

  function handleCheckboxChange(node: CheckboxTreeNode): void {
    node.checked = !node.checked;
    handleCheckDescendants(node);
    handleCheckParent(node);
    setTreeData([...treeData]);
    localStorage.setItem("treeData", JSON.stringify(treeData));
  }

  // useEffect(() => {
  //   const savedData = localStorage.getItem("treeData");
  //   if (savedData) {
  //     const data = JSON.parse(savedData) as CheckboxTreeNode[];
  //     setTreeData(data);
  //   }
  // }, []);

  function handleCheckParent(node: CheckboxTreeNode): void {
    const parent = getParent(node);
    if (parent) {
      const children = getDescendants(parent);
      parent.checked = children.every((child) => child.checked);
      parent.indeterminate =
        children.some((child) => child.checked) && !parent.checked;
      handleCheckParent(parent);
    }
  }

  function handleCheckDescendants(node: CheckboxTreeNode): void {
    if (node.checked) {
      node.indeterminate = false;
    }

    const descendants = getDescendants(node);
    if (descendants.length > 0) {
      descendants.forEach((descendant) => {
        descendant.checked = node.checked;
        handleCheckDescendants(descendant);
      });
    }
  }

  function getDescendants(parentNode: CheckboxTreeNode): CheckboxTreeNode[] {
    const descendants: CheckboxTreeNode[] = [];
    const startIndex = treeData.findIndex(
      (flattenNode) => flattenNode.id === parentNode.id
    );
    for (const item of treeData.slice(startIndex + 1)) {
      if (item.level === parentNode.level || item.level < parentNode.level) {
        break;
      }
      descendants.push(item);
    }
    return descendants;
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
          {getDescendants(node).length > 0 && (
            <button
              onClick={() => {
                const desc = getDescendants(node);
                console.log(node.expanded);
                desc.forEach((cNode) => {
                  cNode.expanded = !cNode.expanded;
                });
                setTreeData([...treeData]);
              }}
              style={{ marginLeft: "10px" }}
            >
              ➕
            </button>
          )}
        </div>
        {node.children.length > 0 && renderTreeNodes(node.children)}
      </div>
    ));
  }

  return (
    <div>
      <button
        onClick={() =>
          localStorage.setItem("treeData", JSON.stringify(treeData))
        }
      >
        Save Tree
      </button>
      <button
        onClick={() => {
          const savedData = localStorage.getItem("treeData");
          if (savedData) {
            const data = JSON.parse(savedData) as CheckboxTreeNode[];
            setTreeData(data);
          }
        }}
      >
        Load Tree
      </button>

      {renderTreeNodes(treeData)}
    </div>
  );
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
