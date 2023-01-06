const specialChars = "@%+\\/'!#$^?:,)(}{][~-_."; // String of special characters to be included in password.
const numericChars = "0123456789"; // String of numeric characters to be included in password.
const lowerCasedChars = "abcdefghijklmnopqrstuvwxyz"; // String of lowercase characters to be included in password.
const upperCasedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";// String of uppercase characters to be included in password.
const charTypePropNamePrefix = "use"; // Prefix for character type option property names.
const retryCharOptionsMessage = "You must select at least one type of characters to use.\n\nDo you want to try again?"

// Function to prompt for a character option.
function promptForCharacterOption(name) {
  return confirm(`Do you want to use ${name} characters?`)
}

// Function to generate character option type description from property name for use in the prompts.
function getCharOptionDescription(name) {
  let withoutPrefix = name.slice(charTypePropNamePrefix.length);
  
  return withoutPrefix.replace(
    /[A-Z]/g, 
    (match, offset) => (offset > 0 ? " " : "") + match.toLowerCase()
  );
}

// Function to prompt user for password character options.
function getPasswordCharOptions(options) {
  Object.keys(options)
    .filter(k => k.startsWith(charTypePropNamePrefix))
    .forEach(k => options[k] = promptForCharacterOption(getCharOptionDescription(k)))
}

// Function to validate character options.
function areCharacterOptionsValid(options) {
  return Object.entries(options)
    .filter(([k, v]) => k.startsWith(charTypePropNamePrefix))
    .some(([k, v]) => v);
}

// Function for getting a random element from an array.
function getRandom(arr) {

}

// Function to generate password with user input.
function generatePassword() {
  var options = {
    useSpecial: false,
    useNumeric: false,
    useUpperCase: false,
    useLowerCase: false
  };

  do {
    getPasswordCharOptions(options);

    if (areCharacterOptionsValid(options)) {
      break;
    }

    if (!confirm(retryCharOptionsMessage)) {
      return "";
    }
  } while(true)
}

// Get references to the #generate element.
var generateBtn = document.querySelector('#generate');

// Write password to the #password input.
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button.
generateBtn.addEventListener('click', writePassword);