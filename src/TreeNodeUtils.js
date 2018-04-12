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

  findNodes(nodes, predicate) {
    let found = [];
    const self = this;

    for (const node of nodes) {
      if (predicate(node)) {
        found = [...found, node];
      }

      if (self.hasChildren(node)) {
        const foundChildren = self.findNodes(node[self.childrenField], predicate);
        found = [...found, ...foundChildren];
      }
    }

    return found;
  };


  filterNode(node, predicate) {
    let res = null;
    const self = this;

    const filteredChildren = self.isBranch(node) ? node[self.childrenField].map((childNode) =>
        self.filterNode(childNode, predicate)).filter(i => i !== null) : null;

    const hasChildrenMatched = filteredChildren && filteredChildren.length > 0;
    const isNodeItselfMatched = predicate(node);

    if (isNodeItselfMatched || hasChildrenMatched) {
      const childrenData = filteredChildren ? { children: filteredChildren } : {};
      res = Object.assign({}, node, childrenData);
    }

    return res;
  }

  filterNodes(nodes, predicate) {
    const filterFunc = (node) => this.filterNode(node, predicate);
    return nodes.map(node => this.filterNode(node, filterFunc)).filter(i => i !== null);
  }

  sortNode(node, compareFunction) {
    const self = this;
    if (self.hasChildren(node)) {
      const children = [...node[self.childrenField]]
        .sort(compareFunction)
        .map(childNode => self.sortNode(childNode, compareFunction));
      return { ...node, children };
    }

    return node;
  }

  sortNodes(nodes, compareFunction) {
    return nodes.sort(compareFunction).map(node => this.sortNode(node, compareFunction));
  }

  mapNode(node, mapFunction, parentNode) {
    const self = this;

    const mappedNode = mapFunction({ ...node }, parentNode);

    if (self.hasChildren(node)) {
      const children = node[self.childrenField]
        .map(n => self.mapNode(n, mapFunction, mappedNode));

      mappedNode[self.childrenField] = children;
    }

    return mappedNode;
  }

  mapNodes(nodes, mapFunction) {
    return nodes.map(node => this.mapNode(node, mapFunction));
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
