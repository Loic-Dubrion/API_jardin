const bcrypt = require('bcrypt');

const saltRounds = 10;
const password = '0000';

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(hash);
});

// 1234 (role admin et user 1) => $2b$10$RfzY8fGSuIAhsJ7H1nheIeeAZdwZ7JNQhEj7cA6KXEeIItl5jVISC
// 0000 (role user) => $2b$10$xTFPO/TJs/2osDsflhhiSuL9DDUktGT4MgEpXDr5uSJbjKsJijDeq
