'use strict';

/*eslint-disable*/
const PriorityQueue = require('js-priority-queue');

// Creating this helps us keep track of the nodes we have visited: 
// visitedNodes is the set to hold the nodes we have visited
// parentMap is the map to hold the paths we have taken(?)
// shortestPathSoFar holds the current shortest route so far until a shorter ones is found (if there is one)
module.exports = (graph, startNode, goalNode) => {
  const visitedNodes = new Set();
  const parentMap = new Map();
  const shortestPathSoFar = new Map();

  const priorityQueue = new PriorityQueue({
    comparator: (a, b) => a.priority - b.priority,
  });

  // properties of priorityQueue- starting node is passed in from above and is where we start
  priorityQueue.queue({
    node: startNode,
    priority: 0,
  });
  // sets shortest path = to start node with a priority of 0
  shortestPathSoFar.set(startNode, 0);

  // while there are nodes in the priorityQueue, do the logic below:
  while (priorityQueue.length > 0) {
    // take node from start and set it to current node
    const currentNode = priorityQueue.dequeue().node;
    // looks to see if the current node is in the set (if we have visited it)
    if (visitedNodes.has(currentNode)) { continue; }
    // adds current node to  set (visitedNodes) so we won't come back to it
    visitedNodes.add(currentNode);
    // if the current node is the one we are looking for (goalNode), we will return the path (parentMap)
    if (currentNode === goalNode) { return parentMap; }
    //  setting neighbors to be the neighbors of where we are currently (current node)
    const neighbors = graph.getNeighbors(currentNode);
    // 
    for (const neighbor of neighbors) {
      // creating variables for weight and neighbors
      const neighborWeight = neighbor.weight;
      const neighborNode = neighbor.node;
      // if visited node has neightbors, go through for loop with next neighbor
      if (visitedNodes.has(neighborNode)) { continue; }
      // if visited node does not have neighbors, proceed to next code
      // 
      const newPathWeight = shortestPathSoFar.get(currentNode) + neighborWeight;
      // if shortestPathSoFar does NOT have any neighbors or if newPathWeight is les than shortest path, move on
      if (!shortestPathSoFar.has(neighbor) ||
         newPathWeight < shortestPathSoFar.get(neighborNode)) {
          // sets shortestPathSoFar to it's neighbor node and newPathWeight(?)
        shortestPathSoFar.set(neighborNode, newPathWeight);
        // set parentMap to the neighborNode and value of currentNode
        parentMap.set(neighborNode, currentNode);
          // set properties for priorityQueue to value of neighborNode and priority to shortest path to the neightborNode
        priorityQueue.queue({
          node: neighborNode,
          priority: shortestPathSoFar.get(neighborNode),
        });
      }
    }
  }
  // Why do we return null? 
  return null; 
};

/* Resources used to understand Dijkstra's Algorithm:
https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-using-priority_queue-stl/

https://stackoverflow.com/questions/18314686/dijkstra-algorithm-with-min-priority-queue

http://www.cs.dartmouth.edu/~thc/cs10/lectures/0509/0509.html

*/
