// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    const navLinksArray = document.querySelectorAll('.nav-links a');
    navLinksArray.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                showNotification('Bitte füllen Sie alle Felder aus.', 'error');
                return;
            }
            
            // Normally we would use a server-side script to send the email
            // For this demo, we'll simulate sending an email with EmailJS
            
            // Create a temporary form data object
            const formData = {
                name: name,
                email: email,
                message: message,
                to_email: 'mail@itc-unruh.de'
            };
            
            // Simulate sending email (in a real implementation, this would use EmailJS or a similar service)
            simulateSendEmail(formData)
                .then(response => {
                    showNotification('Ihre Nachricht wurde erfolgreich gesendet!', 'success');
                    contactForm.reset();
                })
                .catch(error => {
                    showNotification('Es gab ein Problem beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.', 'error');
                    console.error('Error:', error);
                });
        });
    }
    
    // Function to simulate sending email (in production, replace with actual email sending logic)
    function simulateSendEmail(formData) {
        return new Promise((resolve, reject) => {
            // Simulate network request
            setTimeout(() => {
                // Log the data that would be sent
                console.log('Email would be sent with the following data:', formData);
                
                // For demo purposes, we'll always resolve the promise
                // In a real implementation, this would depend on the API response
                resolve({ success: true });
                
                // To simulate an error, uncomment the following line:
                // reject(new Error('Network error'));
            }, 1500);
        });
    }
    
    // Notification system
    function showNotification(message, type) {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            document.body.appendChild(notification);
            
            // Add styles for the notification
            const style = document.createElement('style');
            style.textContent = `
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 15px 25px;
                    border-radius: 5px;
                    color: white;
                    font-weight: 500;
                    z-index: 1000;
                    transform: translateY(100px);
                    transition: transform 0.3s ease;
                    max-width: 300px;
                }
                .notification.show {
                    transform: translateY(0);
                }
                .notification.success {
                    background-color: #48bb78;
                }
                .notification.error {
                    background-color: #e53e3e;
                }
            `;
            document.head.appendChild(style);
        }
        
        // Set notification content and type
        notification.textContent = message;
        notification.className = 'notification ' + type;
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    // Add scroll event listener to change navigation background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(26, 32, 44, 0.9)';
            nav.style.padding = '15px 0';
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'transparent';
            nav.style.padding = '20px 0';
            nav.style.boxShadow = 'none';
        }
    });
});
