import { FlatNode } from "../../data/flat-node";
import { buildTree } from "../../utils/build-tree-utils";

describe("buildTree", () => {
  const flatData: FlatNode[] = [
    { id: "1", name: "Node 1", level: 0, expanded: true },
    { id: "1-1", name: "Node 1-1", level: 1, expanded: true },
    { id: "1-2", name: "Node 1-2", level: 1, expanded: true },
    { id: "2", name: "Node 2", level: 0, expanded: true },
    { id: "2-1", name: "Node 2-1", level: 1, expanded: true },
  ];

  it("should build a tree structure correctly", () => {
    const tree = buildTree(flatData);

    expect(tree).toHaveLength(2);
    expect(tree[0].children).toHaveLength(2);
    expect(tree[0].children[0].name).toBe("Node 1-1");
    expect(tree[0].children[1].name).toBe("Node 1-2");
    expect(tree[1].children).toHaveLength(1);
    expect(tree[1].children[0].name).toBe("Node 2-1");
  });
});
