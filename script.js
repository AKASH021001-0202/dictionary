const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const searchBtn = document.querySelector("#search-btn");
const sound = document.querySelector("sound");
const result = document.querySelector("#result");


function fetchData(word) {
    return new Promise((resolve, reject) => {
        fetch(`${url}${word}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

document.querySelector("#search-btn").addEventListener("click", () => {
    let inputWord = document.querySelector(".search_inp").value;
    console.log(inputWord);
    fetchData(inputWord)
        .then(data => {
            console.log(data);
            let wordExplanation = data[0].meanings[0].definitions[0].example || "";
            let wordExplanationHTML = wordExplanation ? `<p class="word-explain">${wordExplanation}</p>` : "";
            document.querySelector(".result").innerHTML = `<div class="word">
                                    <h3>${inputWord}</h3>
                                    <button onclick="playSound()"><i class='fas fa-volume-up' style='font-size:24px'></i></button>
                                </div>
                                <div class="detail">
                                    <p>${data[0].meanings[0].partOfSpeech}</p>
                                    <p>${data[0].phonetic}</p>
                                </div>
                                <div class="word-meaning">
                                    <p>${data[0].meanings[0].definitions[0].definition}</p>
                                    ${wordExplanationHTML}
                                </div>`;
            document.querySelector("#sound").setAttribute("src", `${data[0].phonetics[0].audio}`);
        })
        .catch(error => {
            console.error('Error:', error);
            document.querySelector(".result").innerHTML = `<div>Failed to fetch data</div>`;
        });
});

function playSound() {
    document.querySelector("#sound").play();
}
