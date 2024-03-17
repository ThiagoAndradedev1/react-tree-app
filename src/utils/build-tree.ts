import { FlatNode } from "../data/flat-node";

interface CheckboxTreeNode extends FlatNode {
  children: CheckboxTreeNode[];
  checked: boolean;
  indeterminate: boolean;
  expanded: boolean;
}

export function buildTree(flatData: FlatNode[]): CheckboxTreeNode[] {
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
