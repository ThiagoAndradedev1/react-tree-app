import { flattenData, flattenNodeFn } from "../../utils/flat-object-utils";
import { FlatNode } from "../../data/flat-node";
import { Node } from "../../data/ node";

describe("flattenData", () => {
  test("flattens data correctly", () => {
    const data: Record<string, Node> = {
      "1": {
        id: "1",
        name: "John Doe",
        level: 0,
        children: {
          "2": {
            id: "2",
            name: "Jane Doe",
            level: 1,
            children: {},
          },
        },
      },
    };

    const expectedFlatData: FlatNode[] = [
      { id: "1", name: "John Doe", level: 0, expanded: true },
      { id: "2", name: "Jane Doe", level: 1, expanded: false },
    ];

    const flattenedData = flattenData(data);
    expect(flattenedData).toEqual(expectedFlatData);
  });
});

describe("flattenPersonFn", () => {
  test("flattens person correctly", () => {
    const person: Node = {
      id: "1",
      name: "John Doe",
      level: 0,
      children: {
        "2": {
          id: "2",
          name: "Jane Doe",
          level: 1,
          children: {},
        },
      },
    };

    const expectedFlatPerson: FlatNode[] = [
      { id: "1", name: "John Doe", level: 0, expanded: true },
      { id: "2", name: "Jane Doe", level: 1, expanded: false },
    ];

    const flattenedPerson: FlatNode[] = [];
    flattenNodeFn(person, 0, flattenedPerson);
    expect(flattenedPerson).toEqual(expectedFlatPerson);
  });
});
