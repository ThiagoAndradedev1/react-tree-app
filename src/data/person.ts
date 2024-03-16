interface Person {
  id: string;
  name: string;
  level: number;
  children: Record<string, Person>;
}

export type { Person };
