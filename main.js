// Tab Navigation
function openTab(tabName) {
    let tabs = document.querySelectorAll('.tab-content');
    let buttons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
}

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
