function changeLanguage(language) {
    const languageIcon = document.getElementById('selected-language-icon');
    const languageButton = document.querySelector('.dropbtn');

    if (language === 'th') {
        languageIcon.src = 'assets/images/icons/th.png';
        languageButton.textContent = 'TH';
    } else if (language === 'zh') {
        languageIcon.src = 'assets/images/icons/cn.png';
        languageButton.textContent = '中文';
    } else if (language === 'ru') {
        languageIcon.src = 'assets/images/icons/ru.png';
        languageButton.textContent = 'РУС';
    } else {
        languageIcon.src = 'assets/images/icons/en.png';
        languageButton.textContent = 'EN';
    }
}

function toggleSearch() {
    const searchContainer = document.getElementById('searchContainer');
    if (searchContainer.style.display === 'block') {
        searchContainer.style.display = 'none';
    } else {
        searchContainer.style.display = 'block';
    }
}

function toggleMenu() {
    const menuContainer = document.querySelector('.menu-container');
    if (menuContainer.style.display === 'block') {
        menuContainer.style.display = 'none';
    } else {
        menuContainer.style.display = 'block';
    }
}

function toggleAirportDropdown() {
    const airportDropdown = document.getElementById('airportDropdown');
    if (airportDropdown.style.display === 'block') {
        airportDropdown.style.display = 'none';
    } else {
        airportDropdown.style.display = 'block';
    }
}

function selectAirport(airport) {
    alert(`Selected airport: ${airport}`);
    toggleAirportDropdown();
}

function toggleAnnouncementFlow() {
    const announcement = document.getElementById('announcement');
    if (announcement.style.animationPlayState === 'paused') {
        announcement.style.animationPlayState = 'running';
    } else {
        announcement.style.animationPlayState = 'paused';
    }
}

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
