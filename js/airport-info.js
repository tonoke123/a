document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.querySelector('.explore-btn');
    const menuGrid = document.querySelector('.menu-grid');
    const alertCard = document.querySelector('.alert-card');
    let isExpanded = true;

    exploreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (!isExpanded) {
            menuGrid.style.display = 'none';
            alertCard.style.display = 'none';
            exploreBtn.querySelector('i').style.transform = 'rotate(180deg)';
        } else {
            menuGrid.style.display = 'grid';
            alertCard.style.display = 'flex';
            exploreBtn.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
});