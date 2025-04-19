/* eslint-disable indent */
/* eslint-disable linebreak-style */
/**
 * pet.js
 *
 * This file should contain your Pet constructor function and prototype methods.
 * Export your Pet constructor and any necessary constants to be used in app.js.
 */

// TODO: Create a PetTypes object with different pet type options
const PetTypes = { CAT: 'cat', DOG: 'dog', COW: 'cow', };

// TODO: Create a States object with different mood states
// eslint-disable-next-line max-len
const States = { HAPPY: 'happy', SAD: 'sad', ECSTATIC: 'ecstatic', CONTENT: 'content', NEUTRAL: 'neutral', BORED: 'bored', MISERABLE: 'miserable', };

const SpeechPhrases = {
  ecstatic: [
    'I\'m having the best day ever!',
    'This is amazing!',
    'I couldn\'t be happier!',
    'Best. Day. Ever!',
    'You\'re the greatest!'
  ],
  happy: [
    'I\'m so happy right now!',
    'What a wonderful day!',
    'You\'re awesome!',
    'Life is good!',
    'I\'m feeling great!'
  ],
  content: [
    'This is nice.',
    'I\'m pretty content.',
    'Things are going well.',
    'I\'m feeling good.',
    'No complaints here.'
  ],
  neutral: [
    'Just another day.',
    'I\'m okay, I guess.',
    'Nothing special happening.',
    'Meh, I\'m fine.',
    'Just hanging out.'
  ],
  bored: [
    'I\'m getting a bit bored...',
    'Is there anything to do?',
    'Kinda dull around here.',
    'I could use some attention.',
    'Not much going on.'
  ],
  sad: [
    'I\'m feeling a bit sad.',
    'Could use some cheering up.',
    'Having a rough day.',
    'I miss you.',
    'I could really use a snack.'
  ],
  miserable: [
    'I\'m really hungry...',
    'Please don\'t forget about me!',
    'I need some attention!',
    'I\'m not feeling well at all.',
    'Help! I need food!'
  ]
};

const Personalities = {
  //impatient increases mood depletion when not fed
  impatient: 6,
  //patient decreases mood depletion when not fed
  patient: 1,
  //decreases effectiveness of feed pet
  hungry: 10,
  //max starting mood
  cheerful: 100
};

/**
 * Pet constructor function
 *
 * TODO: Implement this constructor function that creates a virtual pet
 * @param {string} name - The name of the pet
 * @param {string} type - the type of pet, selected from PetTypes
 * Initialize properties for tracking mood, state, and timestamps
 */
function Pet(name, type) {
  // TODO: Initialize basic properties (name, type)
  this.name = name || PetTypes.COW;
  this.type = type || 'Betty';

  const pCheckOne = Math.random();
  const pCheckTwo = Math.random();

  // Personality assignment
  if (pCheckOne > 0.4) {
    if (pCheckTwo > 0.4) {
      this.personality = Personalities.patient;
      this.stringPersonality = 'patient';
    } else {
      this.personality = Personalities.cheerful;
      this.stringPersonality = 'cheerful';
    }
  } else {
    if (pCheckTwo > 0.4) {
      this.personality = Personalities.hungry;
      this.stringPersonality = 'hungry';
    } else {
      this.personality = Personalities.impatient;
      this.stringPersonality = 'impatient';
    }
  }

  // TODO: Initialize state properties (mood level, state)
  //set starting mood and state based on personality
  if (this.personality === Personalities.cheerful) {
    this.moodLevel = this.personality;
    this.state = States.ECSTATIC;
  } else {
    this.moodLevel = 80;
    this.state = States.HAPPY;
  }

  // TODO: Initialize timestamps (created, last fed)
  this.created = new Date();
  this.lastFed = new Date();

  // TODO: Initialize speech-related properties
  this.isSpeaking = false;
  this.speechText = '';
  this.speechTimeout = null;

  // TODO: Call updateAppearance() to set initial appearance
  this.updateAppearance();
}

/**
 * Feed the pet
 *
 * TODO: Implement this method to feed the pet, which should:
 * - Increase the pet's mood level
 * - Update the last fed timestamp
 * - Update the pet's state
 * - Return a message about the feeding
 * @returns {string} a message on feeding
 */
Pet.prototype.feed = function () {
  // TODO: Implement feed functionality
  //Personality changes effectiveness of food
  if (this.personality === Personalities.hungry) {
    this.moodLevel = Math.min(100, this.moodLevel + this.personality);
  } else {
    this.moodLevel = Math.min(100, this.moodLevel + 20);
  }

  this.lastFed = new Date();

  this.updateState();

  this.speak('Yum! Thank you for feeding me!');

  return `${this.name} has been fed and is ${this.state}`;
};

/**
 * Check if the pet is hungry
 *
 * TODO: Implement this method to determine if the pet is hungry based on
 * how much time has passed since it was last fed
 * @returns {boolean} true if pet is hungry
 */
Pet.prototype.isHungry = function () {
  // TODO: Implement hunger check
  const now = new Date();
  const timeSinceFeeding = now - this.lastFed;

  const hungerThreshold = 60 * 1000;

  return timeSinceFeeding > hungerThreshold;
};

/**
 * Update the pet's state based on mood level
 *
 * TODO: Implement this method to:
 * - Update the pet's mood based on time passed
 * - Set the appropriate state based on mood level
 * - Occasionally trigger random thoughts
 * - Update the pet's appearance
 * @returns {string} new state
 */
Pet.prototype.updateState = function () {
  // TODO: Implement state update
  if (this.isHungry()) {

    // personality changes rate at which mood goes down when not fed
    if (this.personality === Personalities.impatient || this.personality === Personalities.patient) {
      this.moodLevel = Math.max(0, this.moodLevel - this.personality);
    } else {
      this.moodLevel = Math.max(0, this.moodLevel - 2);
    }
  }

  if (this.moodLevel >= 90) {
    this.state = States.ECSTATIC;
  } else if (this.moodLevel >= 75) {
    this.state = States.HAPPY;
  } else if (this.moodLevel >= 60) {
    this.state = States.CONTENT;
  } else if (this.moodLevel >= 45) {
    this.state = States.NEUTRAL;
  } else if (this.moodLevel >= 30) {
    this.state = States.BORED;
  } else if (this.moodLevel >= 15) {
    this.state = States.SAD;
  } else {
    this.state = States.MISERABLE;
  }

  if (Math.random() < 0.2 && !this.isSpeaking) {
    this.speakRandomThought();
  }

  this, this.updateAppearance();

  return this.state;
};

/**
 * Make the pet speak a random thought based on its mood
 *
 * TODO: Implement this method to have the pet express a random thought
 * appropriate to its current mood
 */
Pet.prototype.speakRandomThought = function () {
  const phrases = SpeechPhrases[this.state] || SpeechPhrases.neutral;

  const randomIndex = Math.floor(Math.random() * phrases.length);
  const phrase = phrases[randomIndex];

  this.speak(phrase);
};

/**
 * Make the pet say something
 * @param {string} text - The text to say
 * TODO: Implement this method to display a speech bubble with text
 * and clear it after a few seconds
 */
Pet.prototype.speak = function (text) {
  // TODO: Implement speech functionality

  if (this.speechTimeout) {
    // eslint-disable-next-line no-undef
    clearTimeout(this.speechTimeout);
  }

  this.isSpeaking = true;
  this.speechText = text;

  this.speechTimeout = setTimeout(() => {
    this.isSpeaking = false;
    this.speechText = '';
    this.updateAppearance();
  }, 4000);

  this.updateAppearance();
};

/**
 * Get a status message based on the pet's current state
 * @returns {string} Status message
 * TODO: Implement this method to return an appropriate message
 * describing the pet's current mood state
 */
Pet.prototype.getStatusMessage = function () {
  // TODO: Implement status message generation
  switch (this.state) {
    case States.ECSTATIC:
      return `${this.name} is ecstatic!!`;
    case States.HAPPY:
      return `${this.name} is very happy!`;
    case States.CONTENT:
      return `${this.name} is content.`;
    case States.NEUTRAL:
      return `${this.name} is ok.`;
    case States.BORED:
      return `${this.name} is kinda bored.`;
    case States.SAD:
      return `${this.name} is feeling sad.`;
    case States.MISERABLE:
      return `${this.name} isn't doing very well and very hungry!`;
    default:
      return `${this.name} is here.`;
  }
};

/**
 * Update the pet's appearance based on its type and state
 *
 * TODO: Implement this method to set the pet's appearance property
 * based on its current type and state
 * Include speech bubble if the pet is speaking
 */
Pet.prototype.updateAppearance = function () {
  // TODO: Implement appearance updates
  const petArt = {
    [PetTypes.CAT]: {
      [States.ECSTATIC]: '=^w^=',
      [States.HAPPY]: '=^.^=',
      [States.CONTENT]: '=^-^=',
      [States.NEUTRAL]: '=o.o=',
      [States.BORED]: '=u.u=',
      [States.SAD]: '=T.T=',
      [States.MISERABLE]: '=;.;='
    },
    [PetTypes.DOG]: {
      [States.ECSTATIC]: 'ʕ•ᴥ•ʔ',
      [States.HAPPY]: 'ʕ•ᴥ•ʔ',
      [States.CONTENT]: 'ʕ•ᴥ•ʔ',
      [States.NEUTRAL]: 'ʕ•-•ʔ',
      [States.BORED]: 'ʕ•o•ʔ',
      [States.SAD]: 'ʕ•╭╮•ʔ',
      [States.MISERABLE]: 'ʕ•╥•ʔ'
    },
    [PetTypes.COW]: {
      [States.ECSTATIC]: '(^•|.U.|•^)',
      [States.HAPPY]: '(^•|.u.|•^)',
      [States.CONTENT]: '(^•|._.|•^)',
      [States.NEUTRAL]: '(^•|._.|•^)',
      [States.BORED]: '(^-|._.|-^)',
      [States.SAD]: '(^u|._.|u^)',
      [States.MISERABLE]: '(^U|._.|U^)',
    },
  };

  const typeArt = petArt[this.type] || petArt[PetTypes.COW];
  const art = typeArt[this.state] || typeArt[States.NEUTRAL];

  if (this.isSpeaking && this.speechText) {
    const bubbleWidth = Math.min(40, Math.max(this.speechText.length + 4, 10));
    const topBubble = ' ' + '_'.repeat(bubbleWidth);
    const bottomBubble = ' ' + '-'.repeat(bubbleWidth);
    const textLine = '| ' + this.speechText.padEnd(bubbleWidth - 2, ' ') + ' |';
    this.appearance = `${topBubble}\n${textLine}\n${bottomBubble}\n \\\n ${art}`;
  } else {
    this.appearance = art;
  }
};

// TODO: Export the Pet constructor and any necessary constants
export { Pet, PetTypes, States, Personalities };
