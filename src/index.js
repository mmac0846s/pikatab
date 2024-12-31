/*tslint:disabled*/
chrome.bookmarks.getTree(function(bookmarkTreeis) {
    let buttonIndex = 0;
    bookmarkTreeis.forEach(function(i) {
        process(i);
    });

    function process(i) {
        if (i.children) {
            i.children.forEach(function(child) {
                process(child);
            });
        } else {
            if (i.url && buttonIndex < 3) {
                getimage(i.url, function(image) {
                    console.log('bookmark:', i.title, 'icon:', image);
                    const button = document.getElementsByClassName("bookmark")[buttonIndex];
                    button.style.backgroundImage = `url(${image})`;
                    button.onclick = function() {
                        window.location.href = i.url;
                    };
                    buttonIndex++;
                });
            }
        }
    }
});

function getimage(url, callback) {
    //thanks https://dev.to/derlin/get-favicons-from-any-website-using-a-hidden-google-api-3p1e
    const image = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${new URL(url).href}&size=128`;
    callback(image);
}
//pokemons
const pokemonImages = 905
function getRandomPokemonImage() {
    const randomIndex = Math.floor(Math.random() * pokemonImages) + 1;
    const formattedIndex = randomIndex.toString().padStart(3, '0');
    const imageUrl = `./pokemons/${formattedIndex}.png`;
    document.getElementById('pokemon').src = imageUrl;
    document.getElementById('pokemon').onerror = function() {
        console("[ERROR] Couldnt load Pokemon image");
        document.getElementById('pokemon').src = "./media/null.png"
    }
}

window.onload = getRandomPokemonImage;
//search
document.getElementById('searchbar').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        chrome.search.query({
            text: document.getElementById('searchbar').value
        });
    }
});
//wallpapers
const currentCookieValue = localStorage.getItem('wallpaper');
document.body.style.backgroundImage = `url(./wallpapers/${currentCookieValue})`;
let old = localStorage.getItem('wallpaper');
if (localStorage.getItem('visited') === null) {
    localStorage.setItem("wallpaper", "cyber-city.png");
    localStorage.setItem('visited', "1"); 
} else {
    localStorage.setItem('visited', (parseInt(localStorage.getItem('visited')) + 1).toString()); 
}

setInterval(() => {
    const currentCookieValue = localStorage.getItem('wallpaper');
    document.body.style.backgroundImage = `url(./wallpapers/${currentCookieValue})`;
}, 1);