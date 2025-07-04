const cases = {};
fetchCases();

function fetchCases() {
  fetch('/api/cases')
    .then(response => response.json())
    .then(data => {
      data.forEach(caseData => {
        cases[caseData.file] = caseData;
      });
      populateCaseSelect();
    })
    .catch(error => console.error('Error fetching cases:', error));
}

function populateCaseSelect() {
  const select = document.getElementById('caseSelect');
  select.innerHTML = '';
  Object.keys(cases).forEach(file => {
    const option = document.createElement('option');
    option.value = file;
    option.textContent = cases[file].case_name;
    select.appendChild(option);
  });
  console.log('Dropdown populated with:', Object.keys(cases));
}

function openCase() {
  const select = document.getElementById('caseSelect');
  if (!select.value) return;
  const selectedCase = cases[select.value];
  const rand = Math.random() * 100;
  let cumulative = 0;

  for (const item of selectedCase.items) {
    cumulative += item.probability;
    if (rand <= cumulative) {
      document.getElementById('result').innerHTML = `
        You won: <strong>${item.item_name}</strong> ($${item.price.toLocaleString()}!)!
        <img src="/images/${item.item_name.toLowerCase().replace(/ /g, '_')}.png" alt="${item.item_name}" width="150" height="150">
      `;
      updateChart(selectedCase.items);
      return;
    }
  }
  document.getElementById('result').innerHTML = 'Error: No item won.';
  }
