((app, tmpl) => {
  const root = app.querySelector('#inputs');

  const save = (saveBtn) => {
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    app.querySelector('#save-account').addEventListener('click', () => save());
    const accounts = Array.from(root.querySelectorAll('.field')).map(n => {
      const inputs = n.querySelectorAll('input');
      if (inputs[0].value === '' || inputs[1].value === '') {
        return;
      }
      return {
        accountId: inputs[0].value,
        label: inputs[1].value,
        color: inputs[2].value
      };
    }).filter(is => is);

    chrome.storage.local.set({ accounts }, () => {
      saveBtn.textContent = 'Saved!';
      setTimeout(() => {
        saveBtn.textContent = 'Save Account';
        saveBtn.disabled = false;
      }, 1000);
    });
  };

  const executeTemplate = (accountId = '', label = '', color = '#CCCCCC') => {
    const field = tmpl.content.firstElementChild.cloneNode(true);
    const inputs = field.querySelectorAll('input');
    const delBtn = field.querySelector('button');
    inputs[0].value = accountId;
    inputs[1].value = label;
    inputs[2].value = color;
    delBtn.addEventListener('click', () => {
      if (root.querySelectorAll('.field').length > 1) {
        root.removeChild(field);
      } else {
        inputs[0].value = '';
        inputs[1].value = '';
        inputs[2].value = '#CCCCCC';
      }
      save(app.querySelector('#save-account'));
    });
    return field;
  };

  const boot = accounts => {
    accounts.forEach(({ accountId, label, color }) => {
      root.appendChild(executeTemplate(accountId, label, color));
    });
    app.querySelector('#add-account').addEventListener('click', () => {
      root.appendChild(executeTemplate());
    });
    app.querySelector('#save-account').addEventListener('click', evt => save(evt.target));
  };
  const defaults = {
    accounts: [{ accountId: "", label: "", color: "#CCCCCC" }]
  };
  chrome.storage.local.get(defaults, ({ accounts }) => boot(accounts));
})(
  document.getElementById('app'),
  document.getElementById('tmpl-field')
);
