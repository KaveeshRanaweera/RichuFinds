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
function openAliExpress() {
    var appLink = "aliExpress://s.click.aliexpress.com/e/_oERwPu2";
    var webLink = "https://s.click.aliexpress.com/e/_oERwPu2";

    window.location.href = appLink;
    
    setTimeout(() => {
        window.location.href = webLink;
    }, 1500); // If the app doesn't open, redirect to the browser link
}

// Open AliExpress tab by default when page loads
document.addEventListener("DOMContentLoaded", function() {
    openTab('aliexpress');
});
