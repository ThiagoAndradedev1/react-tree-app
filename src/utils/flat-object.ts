import { FlatPerson } from "../data/flat-person";
import { Person } from "../data/person";

function flattenPersonFn(
  person: Person,
  level: number,
  result: FlatPerson[]
): void {
  const flatPerson: FlatPerson = {
    id: person.id,
    name: person.name,
    level: level,
    expanded: level === 0,
  };
  result.push(flatPerson);

  for (const key in person.children) {
    const child = person.children[key];
    flattenPersonFn(child, level + 1, result);
  }
}

function flattenData(data: Record<string, Person>): FlatPerson[] {
  const flattenedData: FlatPerson[] = [];
  for (const key in data) {
    const person = data[key];
    flattenPersonFn(person, 0, flattenedData);
  }
  return flattenedData;
}

export { flattenPersonFn, flattenData };
