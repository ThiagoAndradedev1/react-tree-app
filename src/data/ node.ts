interface Node {
  id: string;
  name: string;
  level: number;
  children: Record<string, Node>;
}

export type { Node };
