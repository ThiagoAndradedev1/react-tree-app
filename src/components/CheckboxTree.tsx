import { useEffect, useState } from "react";
import { FlatNode } from "../data/flat-node";
import { CheckboxTreeNode } from "../data/checkbox-tree-node";
import { buildTree } from "../utils/build-tree-utils";
import {
  getDescendants,
  handleCheckDescendants,
} from "../utils/descendants-utils";
import { handleCheckParent } from "../utils/parent-utils";
import Checkbox from "./Checkbox";

interface CheckboxTreeProps {
  data: FlatNode[];
}

const CheckboxTree: React.FC<CheckboxTreeProps> = ({ data }) => {
  const [treeData, setTreeData] = useState<CheckboxTreeNode[]>(buildTree(data));

  function handleCheckboxChange(node: CheckboxTreeNode): void {
    node.checked = !node.checked;
    handleCheckDescendants(node, treeData);
    handleCheckParent(node, treeData);
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

export default CheckboxTree;
