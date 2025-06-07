const User = require("../models/Users.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validator = require("express-validator");
const validatorResult = validator.validationResult;

/*
THE SIGN-UP LOGIC
*/

exports.signUp = async (req, res) => {
  const errors = validatorResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  //Checking if the user already exists

  try {
    let user = await User.findOne({ email });
    if (user) {
      //User found, so he already exists. We do not need to create a new user
      return res.status(400).json({ message: "User already exists" });
    }

    //If not exists, I need to hash the password and store the user details
    //Salt is a random string that gets added to the password. This way,even if 2 users have identical passwords
    //it will not have same hashkeys
    const salt = await bcrypt.genSalt(10);
    //The combined password and salt are sent to the algorithm for 10 rounds.
    // so, its more like 10 times hashing making it stringer and resistant to attackers. it cannot be reverse engineered
    const hashPassword = await bcrypt.hash(password, salt);

    //creating the user
    createUser = new User({
      name,
      email,
      password: hashPassword,
    });

    //we are saving the user in the mongoDB.
    await createUser.save();

    //As the user is created,send the response as success
    return res.status(200).json({ message: "User is successfully created" });
  } catch (error) {
    console.error("Sign-up error: ", error.message);
    res.status(500).sendError("Server Error");
  }
};



/*THE LOGIN LOGIC */


//JWT token are for authenticating the user to authorize to his content. once the TOKEN is generatedm user gets the token(more like a secret)
//This secret is stored in the env
//JWT comes in 3 part naming: header.payload.signature
// | Part      | Contains                               |
// | --------- | -------------------------------------- |
// | Header    | Token type & algorithm used            |
// | Payload   | Data you want to send (e.g., `userId`) |
// | Signature | Encrypted using a secret key           |


//JWT are stateless
exports.login = async (req, res) => {
    try {
        //Extract email and password from request body
        const email= req.body.email;
        const password = req.body.password;

        // Find the user in the database
        const user = await User.findOne({ email }); 

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        //  Compare hashed password with entered password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create a JWT token (corrected syntax!)
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send back token in response
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
