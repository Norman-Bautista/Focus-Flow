import bcrypt from 'bcrypt';

// Password Hashing
const SALT_ROUNDS = 12;
export const hashed_Password = async (password) => {

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  return hashed;
};

// Password Comparing 
export const compared_Password = async (input_Pass, hashed_Password) => {
  const response = await bcrypt.compare(input_Pass, hashed_Password);
  return response;
};

// .hash and .compare are bycrypt functions from their library package
// hash is respnsible for hashing our passwords using bycropt hashing algorithm
// compare is for comparing user input of passwrd and their hashed version
// SALT_ROUNDS is a bcrypt concept called salt in which bcrypt adds random chars in strings randomly before password hashing
// Rounds = 12 is the count of how many times the salt should iterate the hashing algorithm will run internally
// the iteration for 12 is 2 to the 12th power exponent