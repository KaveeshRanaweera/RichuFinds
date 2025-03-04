function openTab(tabName) {
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected tab and set the button as active
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[onclick="openTab('${tabName}')"]`).classList.add('active');
}


document.addEventListener("contextmenu", (event) => event.preventDefault());

document.addEventListener("keydown", function (event) {
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I") || (event.ctrlKey && event.key === "U")) {
        event.preventDefault();
    }
});

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && (event.key === "u" || event.key === "c" || event.key === "x" || event.key === "v")) {
        event.preventDefault();
    }
});

document.addEventListener("selectstart", function (event) {
    event.preventDefault();
});


// Open AliExpress tab by default when page loads
document.addEventListener("DOMContentLoaded", function() {
    openTab('aliexpress');
});
