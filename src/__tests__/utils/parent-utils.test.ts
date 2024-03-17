import { CheckboxTreeNode } from "../../data/checkbox-tree-node";
import { getParent, handleCheckParent } from "../../utils/parent-utils";

describe("getParent function", () => {
  const treeData: CheckboxTreeNode[] = [
    {
      id: "1",
      level: 0,
      checked: false,
      indeterminate: false,
      children: [],
      expanded: false,
      name: "Node 1",
    },
    {
      id: "2",
      level: 1,
      checked: false,
      indeterminate: false,
      children: [],
      expanded: false,
      name: "Node 2",
    },
    {
      id: "3",
      level: 2,
      checked: false,
      indeterminate: false,
      children: [],
      expanded: false,
      name: "Node 3",
    },
    {
      id: "4",
      level: 1,
      checked: false,
      indeterminate: false,
      children: [],
      expanded: false,
      name: "Node 4",
    },
  ];

  it("should return null if child node level is 0", () => {
    const childNode: CheckboxTreeNode = {
      id: "1",
      level: 0,
      checked: false,
      indeterminate: false,
      children: [],
      expanded: false,
      name: "Node 1",
    };
    expect(getParent(childNode, treeData)).toBeNull();
  });

  it("should return the correct parent node", () => {
    const childNode: CheckboxTreeNode = {
      id: "3",
      level: 2,
      checked: false,
      indeterminate: false,
      children: [],
      expanded: false,
      name: "Node 2",
    };
    const expectedParent: CheckboxTreeNode = {
      id: "2",
      level: 1,
      checked: false,
      indeterminate: false,
      children: [],
      expanded: false,
      name: "Node 2",
    };
    expect(getParent(childNode, treeData)).toEqual(expectedParent);
  });

  it("should return null if parent node is not found", () => {
    const childNode: CheckboxTreeNode = {
      id: "5",
      level: 2,
      checked: false,
      indeterminate: false,
      children: [],
      expanded: false,
      name: "Node 1",
    };
    expect(getParent(childNode, treeData)).toBeNull();
  });
});

describe("handleCheckParent function", () => {
  let treeData: CheckboxTreeNode[];

  beforeEach(() => {
    treeData = [
      {
        id: "1",
        level: 0,
        checked: false,
        indeterminate: false,
        children: [],
        expanded: false,
        name: "Node 1",
      },
      {
        id: "2",
        level: 1,
        checked: false,
        indeterminate: false,
        children: [],
        expanded: false,
        name: "Node 2",
      },
      {
        id: "3",
        level: 2,
        checked: false,
        indeterminate: false,
        children: [],
        expanded: false,
        name: "Node 3",
      },
      {
        id: "4",
        level: 1,
        checked: false,
        indeterminate: false,
        children: [],
        expanded: false,
        name: "Node 4",
      },
    ];
  });

  it("should update parent node when all children are checked", () => {
    const node: CheckboxTreeNode = treeData[2];
    handleCheckParent(node, treeData);
    expect(treeData[1].checked).toBeFalsy();
    expect(treeData[1].indeterminate).toBeFalsy();
  });

  it("should update parent node when some children are checked", () => {
    treeData[2].checked = true;
    const node: CheckboxTreeNode = treeData[2];
    handleCheckParent(node, treeData);
    expect(treeData[1].checked).toBeTruthy();
    expect(treeData[1].indeterminate).toBeFalsy();
  });

  it("should update parent node recursively", () => {
    treeData[2].checked = true;
    treeData[1].checked = true;
    const node: CheckboxTreeNode = treeData[2];
    handleCheckParent(node, treeData);
    expect(treeData[0].checked).toBeFalsy();
    expect(treeData[0].indeterminate).toBeTruthy();
  });
});
