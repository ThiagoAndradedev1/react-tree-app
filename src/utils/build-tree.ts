import { FlatPerson } from "../data/flat-person";

interface CheckboxTreeNode extends FlatPerson {
  children: CheckboxTreeNode[];
  checked: boolean;
  indeterminate: boolean;
  expanded: boolean;
}

export function buildTree(flatData: FlatPerson[]): CheckboxTreeNode[] {
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
