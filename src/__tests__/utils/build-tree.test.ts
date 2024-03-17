import { FlatPerson } from "../../data/flat-person";
import { buildTree } from "../../utils/build-tree";

describe("buildTree", () => {
  const flatData: FlatPerson[] = [
    { id: "1", name: "Node 1", level: 0, expanded: true },
    { id: "1-1", name: "Node 1-1", level: 1, expanded: true },
    { id: "1-2", name: "Node 1-2", level: 1, expanded: true },
    { id: "2", name: "Node 2", level: 0, expanded: true },
    { id: "2-1", name: "Node 2-1", level: 1, expanded: true },
  ];

  it("should build a tree structure correctly", () => {
    const tree = buildTree(flatData);

    expect(tree).toHaveLength(2); // Verifica se existem dois nós raiz
    expect(tree[0].children).toHaveLength(2); // Verifica se o primeiro nó raiz tem dois filhos
    expect(tree[0].children[0].name).toBe("Node 1-1"); // Verifica o nome do primeiro filho do primeiro nó raiz
    expect(tree[0].children[1].name).toBe("Node 1-2"); // Verifica o nome do segundo filho do primeiro nó raiz
    expect(tree[1].children).toHaveLength(1); // Verifica se o segundo nó raiz tem um filho
    expect(tree[1].children[0].name).toBe("Node 2-1"); // Verifica o nome do filho do segundo nó raiz
  });
});
