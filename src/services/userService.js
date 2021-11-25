import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



async function existConflit(email) {
    const user = await userRepository.existEmail(email);
    
    return user;
}

async function createUser(name, email, password) {
  const hashedPassword = bcrypt.hashSync(password, 12);
  await userRepository.createUser(name, email, hashedPassword)

}

async function auth(email, password) {
  const user = await userRepository.existEmail(email);

  const isEqualPassword = bcrypt.compareSync(password, user ? user.password : "2134");

  if (!user || !isEqualPassword) {
    return null;
  }
  const token = jwt.sign({
    id: user.id
  }, process.env.JWT_SECRET);
  
  return token;
}

  
export { 
  existConflit,
  createUser,
  auth,
};
