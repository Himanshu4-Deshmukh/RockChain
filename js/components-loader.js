// Dynamically load navbar and footer components
document.addEventListener('DOMContentLoaded', function() {
    // Load Navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            const navbarPlaceholder = document.getElementById('navbar-placeholder');
            if (navbarPlaceholder) {
                navbarPlaceholder.innerHTML = data;
                // Re-initialize mean menu after navbar loads
                if (typeof jQuery !== 'undefined' && jQuery.fn.meanmenu) {
                    jQuery('.mean-menu').meanmenu({
                        meanScreenWidth: "991"
                    });
                }
            }
        })
        .catch(error => console.error('Error loading navbar:', error));

    // Load Footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.innerHTML = data;
            }
        })
        .catch(error => console.error('Error loading footer:', error));
});