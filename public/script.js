require('dotenv').config();

document.getElementById('search-button').addEventListener('click', function () {
    const query = document.getElementById('search-input').value;
    fetchWordData(query);
});

function fetchWordData(query) {
    const apiKey = process.env.LEXICALA_API_KEY;  // .envファイルからAPIキーを取得
    const url = `https://lexicala1.p.rapidapi.com/search?source=global&language=en&text=${query}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.error('Error:', error));
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (data.results && data.results.length > 0) {
        data.results.forEach(result => {
            const item = document.createElement('div');
            item.classList.add('result-item');

            const word = document.createElement('h3');
            word.textContent = result.headword.text;

            const definition = document.createElement('p');
            definition.textContent = `Definition: ${result.senses[0].definition}`;

            const translation = document.createElement('p');
            if (result.senses[0].translations) {
                translation.textContent = `Translation: ${result.senses[0].translations[0].text}`;
            } else {
                translation.textContent = 'Translation: Not available';
            }

            item.appendChild(word);
            item.appendChild(definition);
            item.appendChild(translation);

            resultsContainer.appendChild(item);
        });
    } else {
        const noResult = document.createElement('p');
        noResult.textContent = 'No results found.';
        resultsContainer.appendChild(noResult);
    }
}
