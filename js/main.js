document.addEventListener('DOMContentLoaded', () => {
    // Reusable Function: Toggle Visibility
    function toggleVisibility(section1, section2) {
        const isHidden = section1.style.display === 'none';
        section1.style.display = isHidden ? 'block' : 'none';
        section2.style.display = isHidden ? 'block' : 'none';
    }

    // Reusable Function: Show Notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.className = 'dropdown-notification';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Reusable Function: Validate Form
    function validateForm(name, email, message) {
        let valid = true;
        let errorMessage = '';

        if (!name.value.trim()) {
            errorMessage += 'Name is required.\n';
            valid = false;
        }

        if (!email.value.trim() || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email.value)) {
            errorMessage += 'Valid email is required.\n';
            valid = false;
        }

        if (!message.value.trim()) {
            errorMessage += 'Message cannot be empty.\n';
            valid = false;
        }

        return { valid, errorMessage };
    }

    // Contact Us Page: Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            const { valid, errorMessage } = validateForm(name, email, message);

            if (!valid) {
                alert(errorMessage);
            } else {
                alert('Form submitted successfully!');
                contactForm.reset();
            }
        });
    }

    // Services Page: Dropdown Event
    const bikeDropdown = document.getElementById('bike-type');
    const bikeOptions = ["Road Bike", "Mountain Bike", "Hybrid Bike"];

    if (bikeDropdown) {
        // Populate dropdown dynamically
        bikeOptions.forEach((bike) => {
            const option = document.createElement('option');
            option.textContent = bike;
            option.value = bike.toLowerCase().replace(' ', '-');
            bikeDropdown.appendChild(option);
        });

        // Add dropdown change event
        bikeDropdown.addEventListener('change', (event) => {
            const selectedValue = event.target.options[event.target.selectedIndex].text;
            showNotification(`You selected: ${selectedValue}`);
        });
    }

    // About Page: Toggle Visibility
    const toggleVisionButton = document.getElementById('toggle-vision');
    if (toggleVisionButton) {
        const missionSection = document.querySelector('h2:nth-of-type(1) + p'); // "Our Mission" paragraph
        const visionSection = document.querySelector('h2:nth-of-type(2) + p');  // "Our Vision" paragraph

        toggleVisionButton.addEventListener('click', () => {
            toggleVisibility(missionSection, visionSection);
        });
    }

    // Home Page: Dynamic Travel Tips
    const tipsDiv = document.getElementById('travel-tips');
    if (tipsDiv) {
        const tips = [
            "Use public transport whenever possible.",
            "Consider walking or cycling short distances.",
            "Carpool with friends to reduce emissions."
        ];
        let currentTipIndex = 0;

        function updateTip() {
            tipsDiv.textContent = tips[currentTipIndex];
            currentTipIndex = (currentTipIndex + 1) % tips.length;
        }

        updateTip();
        setInterval(updateTip, 5000); // Update every 5 seconds
    }

    // About Page: FAQs
    const faqs = [
        { question: "What is sustainable travel?", answer: "Using eco-friendly travel options like bikes or public transport." },
        { question: "Why choose biking?", answer: "It's healthy and reduces carbon emissions." }
    ];

    const faqSection = document.getElementById('faqs');
    if (faqSection) {
        faqSection.innerHTML = "<h2>FAQs</h2>";
        faqs.forEach(({ question, answer }) => {
            const faq = document.createElement('div');
            faq.innerHTML = `<strong>${question}</strong><p>${answer}</p>`;
            faqSection.appendChild(faq);
        });
    }
});
