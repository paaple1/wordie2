document.getElementById('search-button').addEventListener('click', async () => {
    const word = document.getElementById('word-input').value;
    if (!word) return;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Loading...';

    try {
        const response = await fetch(`/search?word=${word}`);
        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = 'Error fetching data';
            return;
        }

        const entry = data.results[0];
        const senses = entry.senses.map(sense => {
            return `<p><strong>${sense.definition}</strong><br>${sense.translations.map(t => t.text).join(', ')}</p>`;
        }).join('');

        resultDiv.innerHTML = `<h2>${entry.headword.text}</h2>${senses}`;
    } catch (error) {
        resultDiv.innerHTML = 'Error fetching data';
    }
});
