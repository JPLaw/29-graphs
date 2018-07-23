export default (graph, startNode, goalNode) => {
  const queue = [];
 
  const visitedNodes = new Set();
  const parentMap = new Map();

  queue.push(startNode);
  visitedNodes.add(startNode);

  while (queue.length) {
    const currentNode = queue.shift();

    if (currentNode === goalNode) {
      return parentMap;
    }
    const neighbors = graph.getNeighbors(currentNode);
    console.log(neighbors, 'Neighbords');

    /*eslint-disable*/
    for (let neighbor of neighbors) {
      let neighborNode = neighbor.node;

      if (visitedNodes.has(neighborNode)) {
        continue;
      } 

      visitedNodes.add(neighborNode);

      parentMap.set(neighborNode, currentNode);
      queue.push(neighborNode);
    }
  }
  return null;
}