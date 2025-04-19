/* eslint-disable linebreak-style */
/**
 * app.js
 *
 * Main application file that handles UI interactions and updates.
 * Import your Pet constructor and related constants from pet.js
 */

// TODO: Import the Pet constructor and related constants
import { Pet, PetTypes, States } from './pet.js';

// Application state variables
let currentPet = null;
let updateInterval = null;
let elements = {};

/**
 * Initialize the application
 *
 * TODO: Implement this function to:
 * - Select and store DOM elements
 * - Populate the pet selector dropdown
 * - Set up event listeners
 * - Show the pet creation UI
 */
function initApp() {
  // TODO: Select DOM elements
  elements = {
    petDisplay: document.getElementById('pet-display'),
    statusDisplay: document.getElementById('status-display'),
    petSelector: document.getElementById('pet-selector'),
    nameInput: document.getElementById('pet-name'),
    createButton: document.getElementById('create-pet'),
    feedButton: document.getElementById('feed-pet'),
    resetButton: document.getElementById('reset-pet'),
    infoDisplay: document.getElementById('info-display'),
    moodBar: document.getElementById('mood-bar'),
  };

  // TODO: Populate pet selector dropdown
  populatePetSelector();
  // TODO: Set up event listeners
  setupEventListeners();
  // TODO: Show the pet creation UI
  showCreationUI();
}

/**
 * Populate the pet selector dropdown
 *
 * TODO: Implement this function to:
 * - Add an option for each pet type
 * - Set a default selected type
 */
function populatePetSelector() {
  // TODO: Implement pet selector population
  const selector = elements.petSelector;

  if (!selector) {
    return;
  }

  selector.innerHTML = '';

  Object.entries(PetTypes).forEach(([key, value]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = key.charAt(0) + key.slice(1).toLowerCase();
    selector.appendChild(option);
  });

  selector.value = PetTypes.COW;
}

/**
 * Set up event listeners for buttons and interactions
 *
 * TODO: Implement this function to:
 * - Add event listeners for the create, feed, and reset buttons
 */
function setupEventListeners() {
  // TODO: Implement event listeners setup
  elements.createButton?.addEventListener('click', createNewPet);
  elements.feedButton?.addEventListener('click', feedPet);
  elements.resetButton?.addEventListener('click', resetPet);

}

/**
 * Create a new pet based on form selections
 *
 * TODO: Implement this function to:
 * - Get the selected pet type and name
 * - Create a new Pet instance
 * - Update the UI to show the pet
 * - Start the update cycle
 */
function createNewPet() {
  // TODO: Implement pet creation
  const type = elements.petSelector?.value || PetTypes.COW;
  let name = elements.nameInput?.value.trim() || '';

  if (!name) {
    name = type.charAt(0).toUpperCase() + type.slice(1);
  }

  currentPet = new Pet(name, type);

  hideCreationUI();
  updatePetDisplay();
  startUpdateCycle();
}

/**
 * Hide the pet creation UI and show the pet interaction UI
 */
function hideCreationUI() {
  // TODO: Implement UI transition
  document.getElementById('pet-creation')?.classList.add('hidden');
  document.getElementById('pet-interaction')?.classList.remove('hidden');
}

/**
 * Show the pet creation UI and hide the pet interaction UI
 */
function showCreationUI() {
  document.getElementById('pet-creation')?.classList.remove('hidden');
  document.getElementById('pet-interaction')?.classList.add('hidden');
}

/**
 * Update the pet display and status elements
 *
 * TODO: Implement this function to:
 * - Update the pet's visual representation
 * - Update the status message
 * - Update the mood indicator
 * - Update the information display
 */
function updatePetDisplay() {
  // TODO: Implement display updates
  if (!currentPet) {
    return;
  }

  if (elements.petDisplay) {
    elements.petDisplay.textContent = currentPet.appearance;
    elements.petDisplay.className = `pet-display pet-${currentPet.state}`;
  }

  if (elements.statusDisplay) {
    elements.statusDisplay.textContent = currentPet.getStatusMessage();
  }

  updateInfoDisplay();
  updateMoodBar();
}

/**
 * Update the mood level display bar
 *
 * TODO: Implement this function to:
 * - Set the width of the mood bar based on the pet's mood level
 * - Change the color based on the mood level
 */
function updateMoodBar() {
  // TODO: Implement mood bar updates
  if (!elements.moodBar || !currentPet) {
    return;
  }

  elements.moodBar.style.width = `${currentPet.moodLevel}%`;

  if (currentPet.moodLevel >= 75) {
    elements.moodBar.style.backgroundColor = '#4caf50'; // Green
  } else if (currentPet.moodLevel >= 45) {
    elements.moodBar.style.backgroundColor = '#ff9800'; // Orange
  } else {
    elements.moodBar.style.backgroundColor = '#f44336'; // Red
  }
}

/**
 * Update the information display panel
 *
 * TODO: Implement this function to:
 * - Show the pet's name, type, state, etc.
 * - Display the mood level bar
 * - Show timestamps for creation and last feeding
 */
function updateInfoDisplay() {
  // TODO: Implement info display updates
  if (!elements.infoDisplay || !currentPet) {
    return;
  }

  const lastFedTime = currentPet.lastFed.toLocaleTimeString();
  const createdTime = currentPet.created.toLocaleDateString();

  elements.infoDisplay.innerHTML = `


    Name:${currentPet.name}<br>

    Type:${currentPet.type}<br>

    Personality:${currentPet.stringPersonality}<br>

    Mood:${currentPet.state} (${currentPet.moodLevel})<br>

    Mood Level:
    <div class='progress-bar'>
    <div id='mood-bar' class='progress-fill'></div>
    </div>
    <br><br><br>

    Last Fed:${lastFedTime}<br>

    Created:${createdTime}<br>


  `;

  elements.moodBar = document.getElementById('mood-bar');
}

/**
 * Feed the current pet
 *
 * TODO: Implement this function to:
 * - Call the pet's feed method
 * - Update the display with the new state
 */
function feedPet() {
  // TODO: Implement feeding interaction
  if (!currentPet) {
    return;
  }

  const message = currentPet.feed();

  if (elements.statusDisplay) {
    elements.statusDisplay.textContent = message;
  }

  updatePetDisplay();
}

/**
 * Reset the pet simulator
 *
 * TODO: Implement this function to:
 * - Clear the update interval
 * - Reset the current pet
 * - Clear the displays
 * - Show the creation UI
 */
function resetPet() {
  currentPet = null;
  updateInterval = null;
  elements = {};

  initApp();
}

/**
 * Start the regular update cycle
 *
 * TODO: Implement this function to:
 * - Clear any existing update interval
 * - Set up a new interval that:
 *   - Updates the pet's state
 *   - Updates the display
 */
function startUpdateCycle() {
  // TODO: Implement update cycle
  if (updateInterval) {
    // eslint-disable-next-line no-undef
    clearInterval(updateInterval);
  }

  // eslint-disable-next-line no-undef
  updateInterval = setInterval(() => {
    if (currentPet) {
      currentPet.updateState();
      updatePetDisplay();
    }
  }, 1000);
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
