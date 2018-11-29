export default class TreeNodeUtils {
  constructor(config = {}) {
    this.keyField = config.keyField || 'key';
    this.childrenField = config.childrenField || 'children';
  }

  hasChildren(nodeData) {
    const children = nodeData && nodeData[this.childrenField];
    return children && children.length > 0;
  }

  isBranch(nodeData) {
    const children = nodeData && nodeData[this.childrenField];
    return children && children.length >= 0;
  }

  getNodeByKey(nodes, key) {
    let found = null;
    const self = this;

    for (const node of nodes) {
      if (node[self.keyField] === key) {
        found = node;
      } else if (self.hasChildren(node)) {
        found = self.getNodeByKey(node[self.childrenField], key);
      }

      if (found) {
        break;
      }
    }

    return found;
  }

  findNodes(nodes, predicate, parents = []) {
    let found = [];
    const self = this;

    for (const node of nodes) {
      if (predicate(node, parents)) {
        found = [...found, node];
      }

      if (self.hasChildren(node)) {
        const foundChildren = self.findNodes(node[self.childrenField], predicate, [...parents, node]);
        found = [...found, ...foundChildren];
      }
    }

    return found;
  };


  filterNode(node, predicate, parents = []) {
    let res = null;
    const self = this;

    const filteredChildren = self.isBranch(node) ? node[self.childrenField].map((childNode) =>
        self.filterNode(childNode, predicate, [...parents, node])).filter(i => i !== null) : null;

    const hasChildrenMatched = filteredChildren && filteredChildren.length > 0;
    const isNodeItselfMatched = predicate(node, parents);

    if (isNodeItselfMatched || hasChildrenMatched) {
      const childrenData = filteredChildren ? { [self.childrenField]: filteredChildren } : {};
      res = Object.assign({}, node, childrenData);
    }

    return res;
  }

  filterNodes(nodes, predicate, parents = []) {
    return nodes.map(node => this.filterNode(node, predicate, parents)).filter(i => i !== null);
  }

  sortNode(node, compareFunction, parents = []) {
    const self = this;
    if (self.hasChildren(node)) {
      const children = [...node[self.childrenField]]
        .sort((...args) => compareFunction(...args, [...parents, node]))
        .map(childNode => self.sortNode(
          childNode,
          compareFunction,
          [...parents, node, childNode]
        ));
      return { ...node, [self.childrenField]:children };
    }

    return node;
  }

  sortNodes(nodes, compareFunction, parents = []) {
    return nodes.sort((...args) => compareFunction(...args, parents)).map(
      node => this.sortNode(node, compareFunction, parents));
  }

  mapNode(node, mapFunction, parents = []) {
    const self = this;

    const mappedNode = mapFunction({ ...node }, parents);

    if (self.hasChildren(node)) {
      const children = node[self.childrenField]
        .map(n => self.mapNode(n, mapFunction, [...parents, mappedNode]));

      mappedNode[self.childrenField] = children;
    }

    return mappedNode;
  }

  mapNodes(nodes, mapFunction, parents = []) {
    return nodes.map(node => this.mapNode(node, mapFunction, parents));
  }

  renameChildrenFieldForNode(node, newChildrenField) {
    const self = this;
    const children = node[self.childrenField];
    const newNode = { ...node };

    if (self.hasChildren(node)) {
      delete newNode[self.childrenField];
      newNode[newChildrenField] = children
        .map(n => self.renameChildrenFieldForNode(n, newChildrenField));
    }

    return newNode;
  }

  renameChildrenFieldForNodes(nodes, newChildrenField) {
    return nodes.map(node => this.renameChildrenFieldForNode(node, newChildrenField));
  }
}
