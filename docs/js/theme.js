const widget = document.getElementById('settings-widget');
const menu = document.getElementById('theme-menu');
const options = document.querySelectorAll('.theme-option');

const saved_theme = localStorage.getItem('theme');
if (saved_theme) {
    document.documentElement.setAttribute('data-theme', saved_theme);
    setTheme(saved_theme);
} else {
    setTheme('system');
}

function setTheme(theme) {
    if (theme === 'system') {
        localStorage.removeItem('theme');
        const prefers_dark = window.matchMedia('(prefers-color-scheme: dark').matches;
        document.documentElement.setAttribute('data-theme', prefers_dark ? 'dark' : 'light');
    } else {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }
    highlightSelected(theme);
}

function highlightSelected(theme) {
    options.forEach(opt => {
        const match = (theme === opt.dataset.theme)
        opt.classList.toggle('selected', match);
    });
}

widget.addEventListener('click', () => {
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

options.forEach(opt => {
    opt.addEventListener('click', () => {
        const theme = opt.dataset.theme;
        setTheme(theme);
    });
});

document.addEventListener('click', (e) => {
    if (!widget.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = 'none';
    }
});