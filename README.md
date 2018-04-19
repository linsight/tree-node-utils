# tree-node-utils

A set of functions for accessing, searching, filtering data nodes in a tree data structure.

It works on tree data structures like this:

```
const tree = [
  {
    text: 'Computer',
    key: 'a',
    children: [
      {
        text: 'Desktop',
        key: 'd',
      },
      {
        text: 'Laptop',
        key: 'l',
      },
      {
        text: 'Mobile',
        key: 'm',
        children: [
          {
            text: 'Smart Phone',
            key: 's',
          },
          {
            text: 'Tablet',
            key: 't',
            children: [
              {
                text: 'Ipad',
                key: 'ip',
              },
              ...
            ],
          },
          ...
        ],
      },
      ...
    ],
  },
  ...
];


```
And provides the following util functions:


Name|Description|
---|---
`hasChildren(node)` | Returns if the node has children node.
`isBranch(node)` | Returns if the node has children field. This field could be empty;
`getNodeByKey(treeNodes, key)`| Returns the data node having the matching 'key' value.
`findNodes(treeNodes, predicate)`| Returns a flat array of nodes that pass the predicate(test) function.
`filterNodes(treeNodes, predicate)`| Filters the tree data structure with the predicate function. i.e. Return a copy of the data tree with unmatching nodes removed.
`sortNodes(treeNodes, compareFunction)`| Sort the treeNodes and children of every data node using the given compare function. 
`mapNodes(treeNodes, mapFunction)`| Return a new tree after applying a function to every nodes in the original tree. This function is useful for transforming nodes in a tree. <br />`mapFunction` has the signature of `mapFunction(currentNode, parentNode)` and should return a new node object.
`renameChildrenFieldForNodes(treeNodes, newChildrenFieldName)` | Rename the 'childrenField' (e.g. 'children') to something else;

**Note**:  

1. `treeNodes` parameter is deliberately designed to be an array of nodes, instead of a single node, to provide more flexibility. The process a single root node tree, wrap the root node in an array.
2. `predicate` is a callback function to test each node, including any children nodes of the tree. Return true to keep the node, false otherwise;
3. `compareFunction` is the same function used by [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort);
 

 
# Install
```
npm install tree-node-utils --save
```

# Usage Example

```
import TreeNodeUtils from 'tree-node-utils';

const config = {
  childrenField: 'children', // e.g. customise the field for children nodes. e.g. 'subItems', default 'children'
  keyField: 'key', // e.g. customise the field for node key. e.g. 'id', default 'key'
};

const treeNodeUtils = new TreeNodeUtils(config);

const node = treeNodeUtils.getNodeByKey(treeNodes, 'ip');
...

```

 

# Live demo

[demo.html](https://linsight.github.io/tree-node-utils/demo/dist/)

