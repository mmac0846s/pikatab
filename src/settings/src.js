function setWallpaper(wallpaper) {
    localStorage.setItem('wallpaper', wallpaper);
}
const backButtons = document.querySelectorAll('#back');
backButtons.forEach(button => {
    button.onclick = () => setWallpaper(button.value);
});
document.getElementById('searchbar').addEventListener('input', function() {
    var filter = this.value.toLowerCase();
    var buttons = document.querySelectorAll('#wallpapers button');
    buttons.forEach(function(button) {
        if (button.textContent.toLowerCase().includes(filter)) {
            button.style.display = '';
        } else {
            button.style.display = 'none';
        }
    });
});
