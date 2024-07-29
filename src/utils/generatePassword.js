const generatePassword = (length) => {
  console.log("ywsys", length);
  let Characters ="QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuiopasdfghjklmnbvcxz1234567890!@#$%^&*()_+=-`~,.<>{}[]/";
  let password = "";
  for (let index = 0; index < length; index++) {
    password += Characters.charAt(Math.floor(Math.random() * Characters.length));
  }
  return password;
  
};

module.exports = { generatePassword };
