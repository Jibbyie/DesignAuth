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
        }, 2000);
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

    // Contact Us Page: Form Validation and Recent Submissions
    const contactForm = document.getElementById('contactForm');
    const submissionsList = document.getElementById('submissions-list');

    // Load existing submissions from localStorage
    function loadSubmissions() {
        const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
        storedSubmissions.forEach(({ name, email, message }) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${name} - ${email}: ${message}`;
            submissionsList.appendChild(listItem);
        });
    }

    // Save a new submission to localStorage
    function saveSubmission(name, email, message) {
        const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
        storedSubmissions.push({ name, email, message });
        localStorage.setItem('submissions', JSON.stringify(storedSubmissions));
    }

    // Initialize and handle form submission
    if (contactForm) {
        loadSubmissions(); // Load existing submissions on page load

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const { valid, errorMessage } = validateForm(
                { value: name },
                { value: email },
                { value: message }
            );

            if (!valid) {
                alert(errorMessage);
            } else {
                alert('Form submitted successfully!');

                // Save and display the new submission
                saveSubmission(name, email, message);
                const listItem = document.createElement('li');
                listItem.textContent = `${name} - ${email}: ${message}`;
                submissionsList.appendChild(listItem);
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
        const missionText = document.getElementById('mission'); // Target "Our Mission" paragraph
        const visionText = document.getElementById('vision');   // Target "Our Vision" paragraph

        // Set initial visibility to hidden
        missionText.style.display = 'none';
        visionText.style.display = 'none';

        toggleVisionButton.addEventListener('click', () => {
            // Toggle visibility of the paragraphs
            const isHidden = missionText.style.display === 'none';
            missionText.style.display = isHidden ? 'block' : 'none';
            visionText.style.display = isHidden ? 'block' : 'none';
        });
    }



    // Home Page: Dynamic Travel Tips
    const tipsDiv = document.getElementById('travel-tips');
    if (tipsDiv) {
        const tips = [
            "Use public transport whenever possible.",
            "Consider walking or cycling short distances.",
            "Carpool with friends to reduce emissions.",
            "Plan your trips to minimise travel distances.",
            "Use eco-friendly modes of transport like e-scooters or hybrid vehicles.",
            "Combine errands into a single trip to save fuel and time.",
            "Choose accommodations with sustainable practices when travelling.",
            "Pack light to reduce vehicle weight and improve fuel efficiency.",
            "Participate in local bike-share programmes when available.",
            "Encourage your workplace to promote green commuting options."
        ];

        let currentTipIndex = 0;

        function updateTip() {
            tipsDiv.textContent = tips[currentTipIndex];
            currentTipIndex = (currentTipIndex + 1) % tips.length;
        }

        updateTip();
        setInterval(updateTip, 5000); // Update every 5 seconds
    }

    // Interactive Map using Leaflet
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        const map = L.map('map').setView([53.349805, -6.26031], 13); // Dublin Coordinates
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add marker
        L.marker([53.349805, -6.26031]).addTo(map)
            .bindPopup('Dublin City Center')
            .openPopup();
    }

    // Reusable Function: Toggle Dark Mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelector('footer').classList.toggle('dark-mode');
        document.querySelector('nav').classList.toggle('dark-mode');

        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', isDarkMode ? 'enabled' : 'disabled');
    }

    // Apply Dark Mode on Page Load if Enabled
    const savedTheme = localStorage.getItem('dark-mode');
    if (savedTheme === 'enabled') {
        document.body.classList.add('dark-mode');
        document.querySelector('header').classList.add('dark-mode');
        document.querySelector('footer').classList.add('dark-mode');
        document.querySelector('nav').classList.add('dark-mode');
    }

    // Add Event Listener to Toggle Icon
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleDarkMode);
    }

    const faqs = [
        { question: "What is sustainable travel?", answer: "Using eco-friendly travel options like bikes or public transport." },
        { question: "Why choose biking?", answer: "It's healthy and reduces carbon emissions." },
        { question: "How can I start sustainable travel?", answer: "Consider walking, cycling, or using public transport for short distances." },
        { question: "What are the benefits of carpooling?", answer: "Carpooling reduces emissions, saves fuel costs, and decreases traffic congestion." },
        { question: "How does packing light help sustainability?", answer: "Packing light reduces vehicle weight, improving fuel efficiency and reducing emissions." },
        { question: "What is a bike-share programme?", answer: "A service providing shared bicycles for short-term use, often found in urban areas." },
        { question: "What is green commuting?", answer: "Green commuting involves using sustainable transportation options like walking, cycling, or public transit." },
        { question: "How can I find eco-friendly accommodations?", answer: "Look for certifications like LEED or Green Key when booking hotels." },
        { question: "What is the best way to reduce my carbon footprint while travelling?", answer: "Choose public transport, avoid single-use plastics, and support local, sustainable businesses." },
        { question: "Can electric vehicles contribute to sustainable travel?", answer: "Yes, they produce zero tailpipe emissions and can be powered by renewable energy sources." }
    ];


    const faqSearchInput = document.getElementById('faq-search');
    const faqDropdown = document.getElementById('faq-dropdown');
    const faqResult = document.getElementById('faq-result');

    // Populate the dropdown with all FAQs
    function populateDropdown() {
        faqDropdown.innerHTML = ''; // Clear existing dropdown items
        faqs.forEach(({ question }, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = question;
            listItem.dataset.index = index; // Store index for retrieval
            faqDropdown.appendChild(listItem);
        });
    }

    // Display the selected FAQ in the result section
    function displayFaq(index) {
        const { question, answer } = faqs[index];
        faqResult.innerHTML = `<strong>${question}</strong><p>${answer}</p>`;
        faqDropdown.style.display = 'none'; // Hide dropdown after selection
    }

    // Show the dropdown when focusing on the search box
    faqSearchInput.addEventListener('focus', () => {
        populateDropdown();
        faqDropdown.style.display = 'block';
    });

    // Filter the dropdown while typing in the search box
    faqSearchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        populateDropdown(); // Reset dropdown
        Array.from(faqDropdown.children).forEach((item) => {
            const question = item.textContent.toLowerCase();
            item.style.display = question.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Handle FAQ selection from the dropdown
    faqDropdown.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const index = event.target.dataset.index;
            displayFaq(index);
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!faqSearchInput.contains(event.target) && !faqDropdown.contains(event.target)) {
            faqDropdown.style.display = 'none';
        }
    });


});
