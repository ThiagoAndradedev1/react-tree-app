import { flattenData, flattenPersonFn } from "../../utils/flat-object";
import { FlatPerson } from "../../data/flat-person";
import { Person } from "../../data/person";

describe("flattenData", () => {
  test("flattens data correctly", () => {
    const data: Record<string, Person> = {
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

    const expectedFlatData: FlatPerson[] = [
      { id: "1", name: "John Doe", level: 0, expanded: true },
      { id: "2", name: "Jane Doe", level: 1, expanded: false },
    ];

    const flattenedData = flattenData(data);
    expect(flattenedData).toEqual(expectedFlatData);
  });
});

describe("flattenPersonFn", () => {
  test("flattens person correctly", () => {
    const person: Person = {
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

    const expectedFlatPerson: FlatPerson[] = [
      { id: "1", name: "John Doe", level: 0, expanded: true },
      { id: "2", name: "Jane Doe", level: 1, expanded: false },
    ];

    const flattenedPerson: FlatPerson[] = [];
    flattenPersonFn(person, 0, flattenedPerson);
    expect(flattenedPerson).toEqual(expectedFlatPerson);
  });
});
