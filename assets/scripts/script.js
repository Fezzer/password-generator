// String of special characters to be included in password
var specialCharacters = "@%+\\/'!#$^?:,)(}{][~-_.";

// String of numeric characters to be included in password
var numericCharacters = "0123456789";

// String of lowercase characters to be included in password
var lowerCasedCharacters = "abcdefghijklmnopqrstuvwxyz";

// String of uppercase characters to be included in password
var upperCasedCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Function to prompt user for password options
function getPasswordOptions() {

}

// Function for getting a random element from an array
function getRandom(arr) {

}

// Function to generate password with user input
function generatePassword() {

}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);