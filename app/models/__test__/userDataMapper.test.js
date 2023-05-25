require('dotenv').config();
const userDataMapper = require('../userDataMapper');

describe('userDataMapper', () => {
  // Test for getAllUsers
  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users = await userDataMapper.getAllUsers();
      expect(Array.isArray(users.rows)).toBe(true);
    });
  });

  // Test for insertUser
  describe('insertUser', () => {
    it('should create a new user and return it', async () => {
      const userObj = {
        username: 'jest',
        email: 'jest@test.com',
        password: 'jest',
        id_role: 1,
      };
      const newUser = await userDataMapper.insertUser(userObj);
      const returnedUser = newUser.rows[0];

      expect(typeof returnedUser).toBe('object');
      expect(returnedUser.username).toBe(userObj.username);
      expect(returnedUser.email).toBe(userObj.email);
      // as id_role is transformed into 'role' in the response,
      // we can't directly compare id_role in the input and the output
    });
  });
});
