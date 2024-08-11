document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('searchForm');
    console.log(formElement); // nullでないことを確認

    if (formElement) {
        formElement.addEventListener('submit', async function(event) {
            event.preventDefault();

            const word = document.getElementById('word').value;
            const resultDiv = document.getElementById('result');

            console.log('Search term:', word);

            try {
                const response = await fetch(`/search?word=${word}`);
                const data = await response.json();

                console.log('API response:', data);

                if (response.ok) {
                    const { results } = data;
                    if (results.length > 0) {
                        const entry = results[0];
                        const headword = entry.headword.text;
                        const senses = entry.senses.map(sense => `
                            <p><strong>Definition:</strong> ${sense.definition}</p>
                            <p><strong>Translations:</strong> ${sense.translations.map(translation => translation.text).join(', ')}</p>
                        `).join('');

                        resultDiv.innerHTML = `
                            <h2>${headword}</h2>
                            ${senses}
                        `;

                        console.log('Rendered result:', resultDiv.innerHTML);
                    } else {
                        resultDiv.innerHTML = '<p>No results found.</p>';
                    }
                } else {
                    resultDiv.innerHTML = '<p>Error fetching data</p>';
                }
            } catch (error) {
                console.error('Error:', error);
                resultDiv.innerHTML = '<p>Error fetching data</p>';
            }
        });
    } else {
        console.error('Form element not found');
    }
});
