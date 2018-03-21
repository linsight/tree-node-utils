export default class TreeNodeUtils {
  constructor(config = {}) {
    this.keyField = config.keyField || 'key';
    this.childrenField = config.childrenField || 'children';
  }


  hasChildren(nodeData) {
    const children = nodeData[this.childrenField];
    return children && children.length > 0;
  }

  isBranch(nodeData) {
    const children = nodeData[this.childrenField];
    return children && children.length >= 0;
  }

  getNodeByKey(nodes, key) {
    let found = null;
    const self = this;

    for (const node of nodes) {
      if (node[self.keyField] === key) {
        found = node;
      } else if (self.hasChildren(node)) {
        found = self.getNodeByKey(node.children, key);
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
        const foundChildren = self.findNodes(node.children, predicate);
        found = [...found, ...foundChildren];
      }
    }

    return found;
  };


  filterNode(node, predicate) {
    let res = null;
    const self = this;

    const filteredChildren = self.isBranch(node) ? node.children.map((childNode) =>
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
}
