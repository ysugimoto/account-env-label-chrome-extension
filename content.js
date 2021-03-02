const format = accountId => accountId.replace(/\-/g, '');

const getAccountId = () => {
  const userNode = document.querySelector('#nav-usernameMenu');
  if (!userNode) {
    return null;
  }
  const buttonWrap = userNode.firstElementChild;
  if (!buttonWrap) {
    return null;
  }
  const accountNode = buttonWrap.firstElementChild;
  if (!accountNode) {
    return null;
  }
  // accountNode has title attribute of "[IAM name]@[Account Id]"
  const title = accountNode.getAttribute('title');
  if (!title) {
    return null;
  }
  return format(title.split('@')[1].trim());
};

const getTargetNode = () => document.querySelector('[title=CloudShell]');

const boot = accounts => {
  const accountId = getAccountId();
  if (!accountId) {
    return;
  }
  const env = accounts.find(a => format(a.accountId) === accountId);
  if (!env) {
    return;
  }

  const targetNode = getTargetNode();
  if (!targetNode) {
    return;
  }

  const node = document.createElement('span');
  node.textContent = env.label;
  node.style.color = 'white';
  node.style.boxSizing = 'content-box';
  node.style.display = 'block';
  node.style.height = '16px';
  node.style.padding = '10px 16px';
  node.style.flexShrink = '0';
  node.style.fontWeight = 'bold';
  node.style.backgroundColor = env.color || 'grey';
  node.style.textAlign = 'center';
  node.style.borderRadius = '4px';

  targetNode.parentNode.insertBefore(node, targetNode);
};

const defaults = {
  accounts: [
    { accountId: '527366191530', label: 'production' }
  ]
};

chrome.storage.local.get(defaults, items => {
  boot(items.accounts || []);
});
