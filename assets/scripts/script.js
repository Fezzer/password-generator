const charTypes = {
  special: "@%+\\/'!#$^?:,)(}{][~-_.", // String of special characters to be included in password.
  numeric: "0123456789", // String of numeric characters to be included in password.
  lowercase: "abcdefghijklmnopqrstuvwxyz", // String of lowercase characters to be included in password.
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" // String of uppercase characters to be included in password.
};

const charTypePropNamePrefix = "use"; // Prefix for character type option property names.
const minLength = 10; // Minimum allowed password length.
const maxLength = 64; // Maximum allowed password length.
const retryCharOptionsMessage = "You must select at least one type of characters to use.\n\nDo you want to try again?"; // Retry select character type options message.
const lengthInputPrompt = `Please enter a length for your password between ${minLength} and ${maxLength} characters.`; // Length input prompt.
const lengthInvalidMessage = "You did not enter a valid length."; // Invalid length message.

// Function to prompt for a character option.
function promptForCharacterOption(name) {
  return confirm(`Do you want to use ${name} characters?`)
}

// Function to get the character type name from an options property.
function getCharTypeName(propertyName) {
  return propertyName
    .slice(charTypePropNamePrefix.length)
    .toLowerCase();
}

// Function to prompt user for password character options.
function getPasswordCharOptions(options) {
  Object.keys(options)
    .filter(k => k.startsWith(charTypePropNamePrefix))
    .forEach(k => options[k] = promptForCharacterOption(getCharTypeName(k)))
}

// Function to validate character options.
function areCharacterOptionsValid(options) {
  return Object.entries(options)
    .filter(([k, _]) => k.startsWith(charTypePropNamePrefix))
    .some(([_, v]) => v);
}

// Function to validate length input.
function isLengthValid(length) {
  let parsedLength = parseInt(length);

  if (length == parsedLength && parsedLength >= minLength && parsedLength <= maxLength) {
    return true;
  }

  return false;
}

// Function for getting a random number in a specific range.
function getRandomNumber(size) {
  return Math.floor(Math.random() * size);
}

// Function to initialise an options object.
function initialiseOptions() {
  return {
    useSpecial: false,
    useNumeric: false,
    useUppercase: false,
    useLowercase: false,
    passwordLength: 0
  };
}

// Function that gets the enabled character types property names from an options object.
function getEnabledCharTypeNames(options) {
  return Object.entries(options)
    .filter(([k, v]) => k.startsWith(charTypePropNamePrefix) && v)
    .map(([k, _]) => getCharTypeName(k));
}

// Function to prompt for and validate options.
function promptForOptions() {
  let options = initialiseOptions();
  let lengthWasInvalid = false;

  do {
    let length = prompt(`${lengthWasInvalid ? lengthInvalidMessage + "\n\n" : ""}${lengthInputPrompt}`);
    
    if (length === null)
      return;

    if (isLengthValid(length)) {
      options.passwordLength = parseInt(length);
      break;
    }

    lengthWasInvalid = true;
  } while(true);

  do {
    getPasswordCharOptions(options);

    if (areCharacterOptionsValid(options)) 
      break;

    if (!confirm(retryCharOptionsMessage))
      return;
  } while(true);

  return options;
}

// Function to validate that the password contains a character from each of the selected character types.
function isPasswordValid(password, charTypes) {
  return charTypes.every(ct => ct.split("").some(c => password.indexOf(c) !== -1));
}

// Function to generate password with user input.
function generatePassword(options) {
  let enabledCharTypes = Object.entries(charTypes)
    .filter(([k, _]) => getEnabledCharTypeNames(options).includes(k))
    .map(([_, v]) => v);

  let password;

  do {
    password = "";

    for (let i = 0; i < options.passwordLength; i++) {
      let charType = enabledCharTypes[getRandomNumber(enabledCharTypes.length)];
      password += charType[getRandomNumber(charType.length)];
    }
  } while (!isPasswordValid(password, enabledCharTypes));

  return password;
}

// Get references to the #generate element.
var generateBtn = document.querySelector('#generate');

// Write password to the #password input.
function writePassword() {
  var options = promptForOptions();
  
  if (options == undefined)
    return;

  var password = generatePassword(options);
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button.
generateBtn.addEventListener('click', writePassword);