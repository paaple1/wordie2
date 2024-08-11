document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('searchForm');
    const resultDiv = document.getElementById('result');

    function showLoading() {
        resultDiv.innerHTML = '<div class="loader"></div>';
    }

    function hideLoading() {
        resultDiv.innerHTML = '';
    }

    if (formElement) {
        formElement.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const word = document.getElementById('word').value;
            showLoading(); // 検索中にローディングを表示

            try {
                const response = await fetch(`/search?word=${word}`);
                const data = await response.json();

                hideLoading(); // 検索結果を表示する前にローディングを非表示にする

                if (response.ok) {
                    const { results } = data;
                    if (results.length > 0) {
                        const entry = results[0];
                        const headword = entry.headword.text;
                        const senses = entry.senses.map(sense => {
                            let translationsText = '';

                            // translations が配列かどうかを確認
                            if (Array.isArray(sense.translations)) {
                                translationsText = sense.translations.map(translation => translation.text).join(', ');
                            } else if (sense.translations) {
                                translationsText = sense.translations.text;
                            }

                            return `
                                <p><strong>Definition:</strong> ${sense.definition}</p>
                                <p><strong>Translations:</strong> ${translationsText}</p>
                            `;
                        }).join('');

                        resultDiv.innerHTML = `
                            <h2>${headword}</h2>
                            ${senses}
                        `;
                    } else {
                        resultDiv.innerHTML = '<p>No results found.</p>';
                    }
                } else {
                    resultDiv.innerHTML = '<p>Error fetching data</p>';
                }
            } catch (error) {
                console.error('Error:', error);
                resultDiv.innerHTML = '<p>Error fetching data</p>';
                hideLoading(); // エラーが発生した場合でもローディングを非表示にする
            }
        });
    } else {
        console.error('Form element not found');
    }
});
