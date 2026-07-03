// List of common timezones with their cities
const TIMEZONE_MAP = {
    'America/New_York': 'New York',
    'America/Los_Angeles': 'Los Angeles',
    'America/Chicago': 'Chicago',
    'America/Denver': 'Denver',
    'America/Anchorage': 'Anchorage',
    'America/Toronto': 'Toronto',
    'America/Mexico_City': 'Mexico City',
    'America/Sao_Paulo': 'São Paulo',
    'America/Buenos_Aires': 'Buenos Aires',
    'Europe/London': 'London',
    'Europe/Paris': 'Paris',
    'Europe/Berlin': 'Berlin',
    'Europe/Madrid': 'Madrid',
    'Europe/Rome': 'Rome',
    'Europe/Amsterdam': 'Amsterdam',
    'Europe/Moscow': 'Moscow',
    'Asia/Dubai': 'Dubai',
    'Asia/Kolkata': 'India',
    'Asia/Bangkok': 'Bangkok',
    'Asia/Hong_Kong': 'Hong Kong',
    'Asia/Shanghai': 'Shanghai',
    'Asia/Tokyo': 'Tokyo',
    'Asia/Seoul': 'Seoul',
    'Asia/Singapore': 'Singapore',
    'Australia/Sydney': 'Sydney',
    'Australia/Melbourne': 'Melbourne',
    'Australia/Brisbane': 'Brisbane',
    'Australia/Perth': 'Perth',
    'Pacific/Auckland': 'Auckland',
    'Pacific/Fiji': 'Fiji',
    'Africa/Johannesburg': 'Johannesburg',
    'Africa/Cairo': 'Cairo',
    'Africa/Lagos': 'Lagos'
};

// DOM Elements
const clocksContainer = document.getElementById('clocksContainer');
const addBtn = document.getElementById('addBtn');
const timezoneInput = document.getElementById('timezoneInput');
const quickAddBtns = document.querySelectorAll('.quick-add');

// Store active timezones (load from localStorage)
let activeTimezones = JSON.parse(localStorage.getItem('activeTimezones')) || ['UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo'];

// Event Listeners
addBtn.addEventListener('click', addTimezone);
timezoneInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTimezone();
    }
});

quickAddBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const timezone = btn.dataset.timezone;
        addTimezoneToList(timezone);
    });
});

// Add timezone function
function addTimezone() {
    const timezone = timezoneInput.value.trim();
    
    if (!timezone) {
        showAlert('Please enter a timezone');
        return;
    }

    addTimezoneToList(timezone);
    timezoneInput.value = '';
}

// Add timezone to the list
function addTimezoneToList(timezone) {
    // Validate timezone
    try {
        new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    } catch (error) {
        showAlert(`Invalid timezone: ${timezone}`);
        return;
    }

    // Check if already exists
    if (activeTimezones.includes(timezone)) {
        showAlert(`${timezone} is already added`);
        return;
    }

    // Add to list
    activeTimezones.push(timezone);
    saveTimezones();
    renderClocks();
}

// Remove timezone
function removeTimezone(timezone) {
    activeTimezones = activeTimezones.filter(tz => tz !== timezone);
    saveTimezones();
    renderClocks();
}

// Save timezones to localStorage
function saveTimezones() {
    localStorage.setItem('activeTimezones', JSON.stringify(activeTimezones));
}

// Render all clock cards
function renderClocks() {
    clocksContainer.innerHTML = '';

    if (activeTimezones.length === 0) {
        clocksContainer.innerHTML = `
            <div class="empty-state">
                <h2>No timezones added yet</h2>
                <p>Use the input above or click a quick-add button to get started!</p>
            </div>
        `;
        return;
    }

    activeTimezones.forEach(timezone => {
        const clockCard = createClockCard(timezone);
        clocksContainer.appendChild(clockCard);
    });

    // Update times immediately and then every second
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
}

// Create a single clock card
function createClockCard(timezone) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.dataset.timezone = timezone;

    const cityName = TIMEZONE_MAP[timezone] || timezone;

    card.innerHTML = `
        <div class="clock-timezone">${timezone}</div>
        <div class="clock-city">${cityName}</div>
        <div class="digital-time" data-timezone="${timezone}">--:--:--</div>
        <div class="clock-date" data-date="${timezone}">---</div>
        <div class="clock-period" data-period="${timezone}">--</div>
        <div class="remove-hint">Click to remove</div>
    `;

    card.addEventListener('click', () => {
        removeTimezone(timezone);
    });

    return card;
}

// Update time for a specific timezone
function updateClockTime(timezone) {
    const now = new Date();

    // Get time in specific timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });

    const parts = formatter.formatToParts(now);
    const hour = parts.find(p => p.type === 'hour').value;
    const minute = parts.find(p => p.type === 'minute').value;
    const second = parts.find(p => p.type === 'second').value;

    const timeString = `${hour}:${minute}:${second}`;
    const dateString = dateFormatter.format(now);

    // Determine AM/PM
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';

    // Update DOM
    const timeElement = document.querySelector(`[data-timezone="${timezone}"]`);
    const dateElement = document.querySelector(`[data-date="${timezone}"]`);
    const periodElement = document.querySelector(`[data-period="${timezone}"]`);

    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
    if (periodElement) periodElement.textContent = period;
}

// Update all clocks
function updateAllClocks() {
    activeTimezones.forEach(timezone => {
        updateClockTime(timezone);
    });
}

// Show alert/notification
function showAlert(message) {
    alert(message);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderClocks();
});