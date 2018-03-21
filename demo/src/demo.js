import TreeNodeUtils from '../../src/index';
const exampleTree = [
  {
    text: 'Computer',
    key: 'com',
    children: [
      {
        text: 'Desktop',
        key: 'des',
      },
      {
        text: 'Laptop',
        key: 'lap',
      },
      {
        text: 'Mobile',
        key: 'mob',
        children: [
          {
            text: 'Smart Phone',
            key: 'sma',
            children: [
              {
                text: 'Iphone 7',
                key: 'iph7',
              },
              {
                text: 'Galaxy S8',
                key: 'gs8',
              },
            ],
          },
          {
            text: 'Tablet',
            key: 'tab',
            children: [
              {
                text: 'Ipad',
                key: 'ipa',
              },
              {
                text: 'Ipad Pro',
                key: 'ipap',
              },
              {
                text: 'Galaxy Tab 2',
                key: 'gt2',
              },
              {
                text: 'Galaxy Tab 3',
                key: 'gt3',
              },
            ],
          },
        ],
      },
    ],
  },
];

const utils = new TreeNodeUtils();

function update(event) {
  const { target } = event;
  const filterInput = document.querySelector('#filterInput');
  const findInput = document.querySelector('#findInput');
  const getInput = document.querySelector('#getInput');
  const sortDescBtn = document.querySelector('#sortDescBtn');
  const sortAscBtn = document.querySelector('#sortAscBtn');

  const filterFindFunction = (query) => i => {
    const keywords = query.toLowerCase().split(/\s+/);
    const nodeText = i.text.toLowerCase();
    return keywords.findIndex(kw => nodeText.includes(kw)) >= 0;
  };

  const clearInput = () => {
    const inputs = [
      findInput,
      getInput,
      getInput,
    ];
    inputs.forEach(i => {
      if (i !== target) {
        i.value = ''
      }
    });
  };

  clearInput();

  let result = exampleTree;

  if(target === filterInput) {
    result = utils.filterNodes(exampleTree, filterFindFunction(target.value))
  }

  if(target === findInput) {
    result = utils.findNodes(exampleTree, filterFindFunction(target.value))
  }

  if(target === getInput) {
    result = utils.getNodeByKey(exampleTree, target.value);
  }

  if(target === sortDescBtn) {
    result = utils.sortNodes(exampleTree, (a, b) => b.text.localeCompare(a.text));
  }

  if(target === sortAscBtn) {
    result = utils.sortNodes(exampleTree, (a, b) => a.text.localeCompare(b.text));
  }

  document.querySelector('#filterResult').innerText = JSON.stringify(result , null, 4);
}


document.addEventListener('keyup', update);
document.addEventListener('click', update);

update(null);
