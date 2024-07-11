import bcrypt from "bcrypt";

const saltRounds = 10;

export async function comparePassword(inputPassword, storedHashedPassword) {
  const match = await bcrypt.compare(inputPassword, storedHashedPassword);
  return match;
}

export async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
