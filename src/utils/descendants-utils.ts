import { FlatPerson } from "../data/flat-person";

interface CheckboxTreeNode extends FlatPerson {
  children: CheckboxTreeNode[];
  checked: boolean;
  indeterminate: boolean;
  expanded: boolean;
}

function handleCheckDescendants(
  node: CheckboxTreeNode,
  treeData: CheckboxTreeNode[]
): void {
  if (node.checked) {
    node.indeterminate = false;
  }

  const descendants = getDescendants(node, treeData);
  if (descendants.length > 0) {
    descendants.forEach((descendant) => {
      descendant.checked = node.checked;
      handleCheckDescendants(descendant, treeData);
    });
  }
}

function getDescendants(
  parentNode: CheckboxTreeNode,
  treeData: CheckboxTreeNode[]
): CheckboxTreeNode[] {
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

export { handleCheckDescendants, getDescendants };
