import { close } from "fs";

class Junctionbox {
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  distanceTo(other: Junctionbox): number {
    return (
      (other.x - this.x) ** 2 +
      (other.y - this.y) ** 2 +
      (other.z - this.z) ** 2
    );
  }
}

const parseInput = (rawInput: string) =>
  rawInput
    .trimEnd()
    .split("\n")
    .map((line) => {
      const [x, y, z] = line.split(",").map(Number);
      return new Junctionbox(x, y, z);
    });

interface Node {
  left: Junctionbox;
  right: Junctionbox;
  distance: number;
}

class Graph {
  vertices: Junctionbox[] = [];
  edges: Node[] = [];
}

function createGraph(boxes: Junctionbox[]): Graph {
  const graph = new Graph();

  for (let i = 0; i < boxes.length; i++) {
    const left = boxes[i];
    graph.vertices.push(left);
    for (let j = i + 1; j < boxes.length; j++) {
      const right = boxes[j];
      const distance = left.distanceTo(right);
      graph.edges.push({ left, right, distance });
    }
  }

  graph.edges.sort((a, b) => a.distance - b.distance);

  return graph;
}

type Circuit = Set<Junctionbox>;

export function part1(rawInput: string, connectionsToMake = 1000) {
  const input = parseInput(rawInput);

  const graph = createGraph(input);

  let circuits: Circuit[] = [];
  for (let box of graph.vertices) {
    const circuit = new Set<Junctionbox>();
    circuit.add(box);
    circuits.push(circuit);
  }

  for (let i = 0; i < connectionsToMake; i++) {
    const { left, right } = graph.edges[i];

    let leftCircuit: Circuit | undefined;
    let rightCircuit: Circuit | undefined;
    for (let circuit of circuits) {
      if (circuit.has(left)) {
        leftCircuit = circuit;
      }
      if (circuit.has(right)) {
        rightCircuit = circuit;
      }
    }

    if (!leftCircuit) throw "Left circuit undefined!";
    if (!rightCircuit) throw "Right circuit undefined!";

    if (leftCircuit != rightCircuit) {
      for (let box of rightCircuit) {
        leftCircuit.add(box);
        rightCircuit.delete(box);
      }
      // delete rightCircuit from list
      circuits = circuits.filter((c) => c != rightCircuit);
    }
  }

  // order by circuit-size, multiply largest three
  return circuits
    .toSorted((a, b) => b.size - a.size)
    .slice(0, 3)
    .reduce((result, circuit) => result * circuit.size, 1);
}

export function part2(rawInput: string) {
  const input = parseInput(rawInput);

  return "0";
}
