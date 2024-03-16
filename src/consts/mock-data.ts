import { Person } from "../data/person";

const DATA: Record<string, Person> = {
  "0": {
    id: "001",
    name: "Frieren",
    level: 0,
    children: {
      "0": {
        id: "12",
        name: "Fern",
        level: 1,
        children: {},
      },
      "1": {
        id: "22",
        name: "Amano",
        level: 1,
        children: {
          "0": {
            id: "32",
            name: "Heinz",
            level: 2,
            children: {},
          },
          "1": {
            id: "42",
            name: "Liesl",
            level: 2,
            children: {},
          },
        },
      },
    },
  },
  "1": {
    id: "0011111",
    name: "Goku",
    level: 0,
    children: {
      "0": {
        id: "121111",
        name: "Gohan",
        level: 1,
        children: {},
      },
      "1": {
        id: "222222",
        name: "Goten",
        level: 1,
        children: {
          "0": {
            id: "333332",
            name: "Fulano",
            level: 2,
            children: {},
          },
          "1": {
            id: "4444442",
            name: "Sicano",
            level: 2,
            children: {},
          },
        },
      },
    },
  },
};

export { DATA };
