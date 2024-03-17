import { FlatNode } from "../../data/flat-node";
import {
  handleCheckDescendants,
  getDescendants,
} from "../../utils/descendants-utils";

interface CheckboxTreeNode extends FlatNode {
  children: CheckboxTreeNode[];
  checked: boolean;
  indeterminate: boolean;
  expanded: boolean;
}

describe("handleCheckDescendants", () => {
  const treeData: CheckboxTreeNode[] = [
    {
      id: "1",
      name: "Node 1",
      level: 0,
      children: [],
      checked: false,
      indeterminate: false,
      expanded: false,
    },
    {
      id: "1-1",
      name: "Node 1-1",
      level: 1,
      children: [],
      checked: false,
      indeterminate: false,
      expanded: false,
    },
    {
      id: "1-2",
      name: "Node 1-2",
      level: 1,
      children: [],
      checked: false,
      indeterminate: false,
      expanded: false,
    },
    {
      id: "2",
      name: "Node 2",
      level: 0,
      children: [],
      checked: false,
      indeterminate: false,
      expanded: false,
    },
    {
      id: "2-1",
      name: "Node 2-1",
      level: 1,
      children: [],
      checked: false,
      indeterminate: false,
      expanded: false,
    },
  ];

  it("should handle descendants correctly", () => {
    const parentNode: CheckboxTreeNode = {
      id: "1",
      name: "Node 1",
      level: 0,
      children: [treeData[1], treeData[2]],
      checked: true,
      indeterminate: false,
      expanded: false,
    };
    handleCheckDescendants(parentNode, treeData);

    expect(parentNode.indeterminate).toBe(false);
    expect(parentNode.children[0].checked).toBe(true); // Aqui ajustamos para true, pois parentNode.checked foi definido como true
    expect(parentNode.children[1].checked).toBe(true); // Aqui ajustamos para true, pois parentNode.checked foi definido como true
  });
});

describe("getDescendants", () => {
  const treeData: CheckboxTreeNode[] = [
    {
      id: "1",
      name: "Node 1",
      level: 0,
      children: [],
      checked: false,
      indeterminate: false,
      expanded: false,
    },
    {
      id: "1-1",
      name: "Node 1-1",
      level: 1,
      children: [],
      checked: false,
      indeterminate: false,
      expanded: false,
    },
    {
      id: "1-2",
      name: "Node 1-2",
      level: 1,
      children: [],
      checked: false,
      indeterminate: false,
      expanded: false,
    },
    {
      id: "2",
      name: "Node 2",
      level: 0,
      children: [],
      checked: false,
      indeterminate: false,
      expanded: false,
    },
    {
      id: "2-1",
      name: "Node 2-1",
      level: 1,
      children: [],
      checked: false,
      indeterminate: false,
      expanded: false,
    },
  ];

  it("should get descendants correctly", () => {
    const parentNode: CheckboxTreeNode = {
      id: "1",
      name: "Node 1",
      level: 0,
      children: [treeData[1], treeData[2]],
      checked: false,
      indeterminate: false,
      expanded: false,
    };
    const descendants = getDescendants(parentNode, treeData);

    expect(descendants).toHaveLength(2);
    expect(descendants[0].name).toBe("Node 1-1");
    expect(descendants[1].name).toBe("Node 1-2");
  });
});
