import { expect } from 'chai';
import TreeNodeUtils from './TreeNodeUtils';

const treeNodeUtils = new TreeNodeUtils();

const tree = [
  {
    text: 'foo',
    key: 'foo',
    children: [
      {
        text: 'bar',
        key: 'bar',
      },
      {
        text: 'boo',
        key: 'boo',
      },
      {
        text: 'poo',
        key: 'poo',
        children: [
          {
            text: 'kar',
            key: 'kar',
          },
          {
            text: 'moo',
            key: 'moo',
            children: [
              {
                text: 'dar sar',
                key: 'dar sar',
              },
            ],
          },
          {
            text: 'koo',
            key: 'koo',
          },
        ],
      },
    ],
  },
  {
    text: 'xfoo',
    key: 'xfoo',
    children: [
      {
        text: 'xbar',
        key: 'xbar',
      },
      {
        text: 'xboo',
        key: 'xboo',
      },
      {
        text: 'xpoo',
        key: 'xpoo',
        children: [
          {
            text: 'xkar',
            key: 'xkar',
          },
          {
            text: 'xmoo',
            key: 'xmoo',
            children: [
              {
                text: 'xdar sar',
                key: 'xdar sar',
              },
            ],
          },
          {
            text: 'xkoo',
            key: 'xkoo',
          },
        ],
      },
    ],
  },
];

describe('treeNodeUtils', () => {
  describe('getNodeByKey', () => {
    it('should get node by key', () => {
      const testCases = ['bar', 'moo', 'dar sar', 'xbar', 'foo', 'xdar sar'];

      testCases.forEach((testCase) => {
        const result = treeNodeUtils.getNodeByKey(tree, testCase);
        expect(result).not.to.be.null;
        expect(result.key).to.equal(testCase);
      });
    });
  });

  describe('filterNodes', () => {
    it('should filter tree by a predicate function', () => {
      const result = treeNodeUtils.filterNodes(tree, i => i.text.includes('x'));
      expect(result.length).to.equal(1);
      expect(result[0].key).to.equal('xfoo');
      expect(result[0].children[2].children[1].key).to.equal('xmoo');
    });
  });

  describe('sortNodes', () => {
    it('should get sort nodes', () => {
      const compareFunc = (a, b) => a.text.localeCompare(b.text);
      let result = treeNodeUtils.sortNodes(tree, compareFunc);
      expect(result[0].children[2].children.map(i => i.text)).to.deep.equal(['kar', 'koo', 'moo']);
      expect(result[1].children[2].children.map(i => i.text)).to.deep.equal(['xkar', 'xkoo', 'xmoo']);
    });
  });

  describe('findNodes', () => {
    it('should find single node', () => {
      const predicate = (node) => node.key === 'xdar sar';
      const result = treeNodeUtils.findNodes(tree, predicate);
      expect(result).to.deep.equal([{
        text: 'xdar sar',
        key: 'xdar sar',
      }]);
    });

    it('should find multiple nodes', () => {
      const predicate = (node) => node.key.includes('oo') && !node.key.includes('x');
      const result = treeNodeUtils.findNodes(tree, predicate);

      expect(result.map(node => node.key)).to.deep.equal(['foo', 'boo', 'poo', 'moo', 'koo']);
    });
  });

  describe('mapNodes', () => {
    it('should map sort nodes', () => {
      const mapFunc = (n, parentN) => ({...n, path: `${parentN ? parentN.path : ''}/${n.key}`});
      let result = treeNodeUtils.mapNodes(tree, mapFunc);

      expect(result[0].path).to.equal('/foo');
      expect(result[0].children[2].children[1].path).to.equal('/foo/poo/moo');
    });
  });
});
