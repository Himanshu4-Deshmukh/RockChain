/**
 * Telegram Bot Contact Form Integration
 * Handles form submission and sends messages to Telegram chat
 */

jQuery(document).ready(function ($) {
    // Telegram bot configuration
    const TELEGRAM_BOT_TOKEN = "8704884272:AAEnUKOWIJjxOnh5QDW3xc7SlVXCI9056Nk";
    const TELEGRAM_CHAT_ID = "5211441236";

    /**
     * Collect and format form data
     * @returns {string} Formatted message for Telegram
     */
    const prepareMessage = function () {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        return `🔔 New Inquiry from Techsolv Website:

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}
📋 Subject: ${subject}
💬 Message: ${message}

---
Sent from contact form`;
    };

    /**
     * Send message to Telegram via Bot API
     * @param {string} message - Formatted message text
     */
    const sendToTelegram = function (message) {
        const settings = {
            async: true,
            crossDomain: true,
            url: `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
            },
            data: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: "HTML"
            })
        };

        $.ajax(settings)
            .done(function (response) {
                showNotification("✅ Your message has been sent successfully! We will contact you soon.", "success");
            })
            .fail(function (error) {
                console.error("Telegram API Error:", error);
                showNotification("⚠️ There was an error sending your message. Please try again or contact us directly.", "error");
            });
    };

    /**
     * Show notification modal
     * @param {string} message - Message to display
     * @param {string} type - Notification type (success/error)
     */
    const showNotification = function (message, type) {
        const modal = document.getElementById("alertModal");
        const alertMessage = document.getElementById("alertMessage");
        
        if (!modal || !alertMessage) {
            alert(message);
            return;
        }

        alertMessage.textContent = message;
        alertMessage.className = type === "success" ? "success-message" : "error-message";
        modal.style.display = "block";

        // Close button handler
        const closeBtn = modal.querySelector(".close");
        if (closeBtn) {
            closeBtn.onclick = function () {
                modal.style.display = "none";
            };
        }

        // Close when clicking outside modal
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        // Auto close after 5 seconds
        setTimeout(() => {
            modal.style.display = "none";
        }, 5000);
    };

    /**
     * Reset form fields to empty
     */
    const resetForm = function () {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("service").value = "";
        document.getElementById("message").value = "";
    };

    // Form submission event listener
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const message = prepareMessage();
            sendToTelegram(message);
            resetForm();
        });
    }
});