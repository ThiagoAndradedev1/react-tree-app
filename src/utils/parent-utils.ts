import { CheckboxTreeNode } from "../data/checkbox-tree-node";
import { getDescendants } from "./descendants-utils";

function getParent(
  childNode: CheckboxTreeNode,
  treeData: CheckboxTreeNode[]
): CheckboxTreeNode | null {
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

function handleCheckParent(
  node: CheckboxTreeNode,
  treeData: CheckboxTreeNode[]
): void {
  const parent = getParent(node, treeData);
  if (parent) {
    const children = getDescendants(parent, treeData);
    parent.checked = children.every((child) => child.checked);
    parent.indeterminate =
      children.some((child) => child.checked) && !parent.checked;
    handleCheckParent(parent, treeData);
  }
}

export { getParent, handleCheckParent };
