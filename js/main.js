document.addEventListener('DOMContentLoaded', () => {
    // Reusable Function: Toggle Visibility - not used
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
    function validateForm(name, email, message, phone) {
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

        if (!phone.value.trim()) {
            errorMessage += 'Phone number is required.\n';
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
        storedSubmissions.forEach(({ name, email, message, phone }) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${name} - ${phone} - ${email}: ${message}`;
            submissionsList.appendChild(listItem);
        });
    }

    // Save a new submission to localStorage
    function saveSubmission(name, email, message, phone) {
        const storedSubmissions = JSON.parse(localStorage.getItem('submissions')) || [];
        storedSubmissions.push({ name, email, message, phone });
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
            const phone = document.getElementById('phone').value;

            const { valid, errorMessage } = validateForm(
                { value: name },
                { value: email },
                { value: message },
                { value: phone }
            );

            if (!valid) {
                alert(errorMessage);
            } else {
                alert('Form submitted successfully!');

                // Save and display the new submission
                saveSubmission(name, email, message, phone);
                const listItem = document.createElement('li');
                listItem.textContent = `${name} - ${phone} - ${email}: ${message}`;
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
            "Whenever possible, take public transportation.",
            "Think about short walks or bike rides.",
            "To cut down on emissions, carpool with friends.",
            "Arrange your travels to cut down on distance.",
            "Make use of environmentally friendly transportation options, such as hybrid cars or e-scooters.",
            "To save time and petrol, run all of your errands in one trip.",
            "When travelling, pick lodgings that follow sustainable methods.",
            "Reduce the weight of your car and increase its fuel efficiency by packing light.",
            "When possible, take use of local bike-share programs.",
            "Encourage your place of employment to support eco-friendly transportation options.",
            "Switch off your car engine when idle.",
            "Carry a reusable water bottle.",
            "Support local eco-friendly businesses.",
            "Plan your trips to avoid peak hours.",
            "Opt for direct flights to cut emissions.",
            "Share rides to reduce traffic and costs.",
            "Walk instead of driving short distances.",
            "Use public transport apps to plan routes.",
            "Recycle waste while on the go.",
            "Choose renewable energy-powered vehicles.",
            "Avoid using plastic bags while shopping.",
            "Explore nature trails on foot.",
            "Support sustainable tourism initiatives.",
            "Limit air travel when possible.",
            "Choose electric or hybrid cars for rentals.",
            "Switch to digital tickets to save paper.",
            "Avoid single-use plastics while travelling.",
            "Promote walking meetings at work.",
            "Use solar-powered chargers for devices.",
            "Take the stairs instead of the lift.",
            "Travel with reusable utensils and cups.",
            "Pick scenic walking routes over taxis.",
            "Learn about local eco-friendly initiatives.",
        ];
        

        let currentTipIndex = 0;

        function updateTip() {
            const randomIndex = Math.floor(Math.random() * tips.length);
            tipsDiv.textContent = tips[randomIndex]; 
        }

        updateTip();
        setInterval(updateTip, 3000); // Update every 3 seconds
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
        { question: "Sustainable travel: what is it?", answer: "Utilising eco-friendly modes of transportation, such as bicycles or public transportation." },
        { question: "Why go for a bike?", answer: "It lowers carbon emissions and is healthy." },
        { question: "How can I begin travelling sustainably?", answer: "For short distances, think about walking, cycling, or taking public transportation." },
        { question: "What advantages can carpooling offer?", answer: "Carpooling lessens traffic congestion, lowers pollution, and saves money on petrol." },
        { question: "In what ways does packing light contribute to sustainability?", answer: "Light packing lowers the weight of the vehicle, increasing fuel economy and lowering pollutants." },
        { question: "A bike-share programme: what is it?", answer: "A short-term bicycle sharing service that is frequently available in cities." },
        { question: "Green commuting: what is it?", answer: "Using environmentally friendly modes of transportation, such as walking, bicycling, or public transportation, is known as 'green commuting.'" },
        { question: "How can I locate lodging that is environmentally friendly?", answer: "When making hotel reservations, look for certifications like LEED or Green Key." },
        { question: "How can I minimise my carbon footprint while travelling?", answer: "Avoid single-use plastics, take public transportation, and patronise sustainable, local companies." },
        { question: "Can eco-friendly travel be facilitated by electric vehicles?", answer: "Indeed, they can be fuelled by renewable energy sources and emit no tailpipe emissions." }
    ];


    const faqSearchInput = document.getElementById('faq-search');
    const faqDropdown = document.getElementById('faq-dropdown');
    const faqResult = document.getElementById('faq-result');

    // Ensure elements exist before attaching event listeners
    if (faqSearchInput && faqDropdown && faqResult) {
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
    }

    const navbarToggle = document.getElementById('toggle-navbar');
    const nav = document.getElementById('main-nav');

    // Ensure elements exist before adding event listeners or modifying class
    if (navbarToggle && nav) {
        navbarToggle.addEventListener('click', () => {
            nav.classList.toggle('hidden');
        });

        // Apply the "hidden" class by default on mobile screens
        if (window.innerWidth <= 768) {
            nav.classList.add('hidden');
        }
    }

});
