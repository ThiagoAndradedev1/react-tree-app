import { FlatNode } from "./flat-node";

interface CheckboxTreeNode extends FlatNode {
  children: CheckboxTreeNode[];
  checked: boolean;
  indeterminate: boolean;
  expanded: boolean;
}

export type { CheckboxTreeNode };
