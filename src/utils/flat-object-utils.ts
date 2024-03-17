import { FlatNode } from "../data/flat-node";
import { Node } from "../data/ node";

function flattenNodeFn(person: Node, level: number, result: FlatNode[]): void {
  const flatPerson: FlatNode = {
    id: person.id,
    name: person.name,
    level: level,
    expanded: level === 0,
  };
  result.push(flatPerson);

  for (const key in person.children) {
    const child = person.children[key];
    flattenNodeFn(child, level + 1, result);
  }
}

function flattenData(data: Record<string, Node>): FlatNode[] {
  const flattenedData: FlatNode[] = [];
  for (const key in data) {
    const person = data[key];
    flattenNodeFn(person, 0, flattenedData);
  }
  return flattenedData;
}

export { flattenNodeFn, flattenData };
