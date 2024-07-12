
const UserService = require("../src/services/user.service");

jest.mock('../src/services/user.service');

describe('UserService', () => {
  let userService;

  beforeAll(() => {
    userService = new UserService();
  });

  it('should create a new user', async () => {

    const input = {
      email: "testuser7@gmail.com",
      password: "password7",
      username: "username7",
      firstname: "firstname",
      lastname: "lastname",
      phonenumber: "9950787281"
    }
    const output = {
      id: 10,
      firstname: "firstname",
      lastname: "lastname",
      username: "username7",
      password: "$2b$10$M0BmgUSprRrWehS41LV9IOC/4r5AAmcmbB3T8i5FM7Y1VC0giljQ2",
      phonenumber: "9950787281",
      email: "testuser7@gmail.com",
      occupation: null,
      address: null
    }
    //mocking signUp function
    userService.signUp.mockResolvedValue(output);
    // Use UserService to create a user
    const user = await userService.signUp(input);

    expect(user).toBeDefined();
    expect(user.username).toBe(output.username);
    expect(user.email).toBe(output.email);
  });

  it('should throw error on entering exisiting user', async () => {

    const input = {
      email: "testuser7@gmail.com",
      password: "password7",
      username: "username7",
      firstname: "firstname",
      lastname: "lastname",
      phonenumber: "9950787281"
    }
    
     //mocking signUp function
    userService.signUp.mockRejectedValue(new Error("User with this email or username already exist."));
    await expect(userService.signUp(input)).rejects.toThrow("User with this email or username already exist.");

  })

});



