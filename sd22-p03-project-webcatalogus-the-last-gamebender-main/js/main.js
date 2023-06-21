console.log('Main JS loaded');
fetch("https://mbo-sd.nl/period3-fetch/games-pc-blizzard-entertainment")
.then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);
})

//https://mbo-sd.nl/period3-fetch/games-pc-blizzard-entertainment

//https://mbo-sd.nl/period3-fetch/games-pc-epic-games

//https://mbo-sd.nl/period3-fetch/games-pc-riot-games

//https://mbo-sd.nl/period3-fetch/games-console-activision-blizzard

//https://mbo-sd.nl/period3-fetch/games-console-rockstar

//https://mbo-sd.nl/period3-fetch/games-console-ubisoft

//https://mbo-sd.nl/period3-fetch/games-mobile-disney-interactive

//https://mbo-sd.nl/period3-fetch/games-mobile-konami

//https://mbo-sd.nl/period3-fetch/games-mobile-niantic

//https://mbo-sd.nl/period3-fetch/games-merchandise-funko

//https://mbo-sd.nl/period3-fetch/games-merchandise-razer

//https://mbo-sd.nl/period3-fetch/games-merchandise-marvel


console.log('Main JS loaded');
fetch("https://mbo-sd.nl/period3-fetch/games-merchandise-funko")
    .then((response) => response.json())
    .then(funkoData => {
        showPop(funkoData);
    });


const pop = document.querySelector('.funko');

function showPop(funkoData) {
    console.log(funkoData);

    for (let p = 0; p < funkoData.length; p++) {
        const f = funkoData[p];

        const cardcode = `
        <div class="col-sm-4 pt-2">
            <div class="card">
                <img class="card-img-top" src="${f.img}" alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title">${f.theme}</h4>
                    <h4 class="card-title">${f.title}</h4>
                    <p class="card-text">${f.description}</p>
                    <p class="card-text">€${f.price}</p>
                 </div>
            </div>
        </div>
    `;
        pop.innerHTML += cardcode
    }
}


fetch("https://mbo-sd.nl/period3-fetch/games-merchandise-razer")
    .then((response) => response.json())
    .then(razerData => {
        showmerch(razerData);
    });


const razer = document.querySelector('.razer');

function showmerch(razerData) {
    console.log(razerData);

    for (let r = 0; r < razerData.length; r++) {
        const a = razerData[r];

        const cardcode = `
        <div class="col-sm-4 pt-3">
            <div class="card">
                <img class="card-img-top" src="${a.img}" alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title">${a.title}</h4>
                    <p class="card-text">${a.description}</p>
                    <p class="card-text">€${a.price}</p>
                 </div>
            </div>
        </div>
    `;
        razer.innerHTML += cardcode
    }
};

fetch("https://mbo-sd.nl/period3-fetch/games-merchandise-marvel")
    .then((response) => response.json())
    .then(marvelData => {
        showMarvel(marvelData);
    });


const marvel = document.querySelector('.marvel');

function showMarvel(marvelData) {
    console.log(marvelData);

    for (let m = 0; m < marvelData.length; m++) {
        const s = marvelData[m];

        const cardcode = `
        <div class="col-sm-4 pt-3">
            <div class="card">
                <img class="card-img-top" src="${s.img}" alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title">${s.theme}</h4>
                    <h4 class="card-title">${s.title}</h4>
                    <p class="card-text">${s.description}</p>
                    <p class="card-text">€${s.price}</p>
                 </div>
            </div>
        </div>
    `;
        marvel.innerHTML += cardcode
    }
};