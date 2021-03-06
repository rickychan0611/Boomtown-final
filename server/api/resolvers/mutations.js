const { ApolloError } = require("apollo-server-express");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const graphql = require('graphql');
const  jwt  =  require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for attaching a cookie to the HTTP
   *  response. 'apollo-server-express' handles returning the response to the client.
   *  We added the 'req' object to the resolver context so we can use it to atttach the cookie.
   *  The 'req' object comes from express.
   *
   *  A secure cookie that can be used to store a user's session data has the following properties:
   *  1) It can't be accessed from JavaScript
   *  2) It will only be sent via https (but we'll have to disable this in development using NODE_ENV)
   *  3) A boomtown cookie should oly be valid for 2 hours.
   */
  // Refactor this method with the correct configuration values.
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 2*(60*60*1000)
    
    // @TODO: Supply the correct configuration values for our cookie here
  });
  // -------------------------------
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user; // Omit the password from the token
  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for generating the JWT token.
   *  Here, we'll be taking a JSON object representing the user (the 'J' in JWT)
   *  and cryptographically 'signing' it using our app's 'secret'.
   *  The result is a cryptographic hash representing out JSON user
   *  which can be decoded using the app secret to retrieve the stateless session.
   */
  // Refactor this return statement to return the cryptographic hash (the Token)
  const  expiresIn  =  24  *  60  *  60;
  // const SECRET_KEY = app.get("JWT_SECRET");
  console.log(id)
  const  accessToken  =  jwt.sign({ id, email,fullname,bio }, secret, {
      expiresIn:  expiresIn
  });

  console.log('token'+ accessToken)
  return accessToken;
  // -------------------------------
}

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
// const authMutations = require("./auth")
// -------------------------------

const mutationResolvers = app => ({
  
  async signup(
    parent,
    {
      user: { fullname, email, password, avatar },
    },
    { pgResource, req },
  ) {
    try {
      console.log('signup trigger, mutations line 80')
      //console.log("singup run" + JSON.stringify(user))
      /**
       * @TODO: Authentication - Server
       *
       * Storing passwords in your project's database requires some basic security
       * precautions. If someone gains access to your database, and passwords
       * are stored in 'clear-text' your users accounts immediately compromised.
       *
       * The solution is to create a cryptographic hash of the password provided,
       * and store that instead. The password can be decoded using the original password.
       */
      // @TODO: Use bcrypt to generate a cryptographic hash to conceal the user's password before storing it.var salt = bcrypt.genSaltSync(saltRounds);
      let salt = 10;
      let hashedPassword = await bcrypt.hash(password, salt);
      // console.log('hashedPassword: ' + hashedPassword)      // -------------------------------

      const user = await pgResource.createUser({
        fullname,
        email,
        password: hashedPassword,
        avatar
      });
      // console.log('token')÷
      const token = generateToken(user, app.get("JWT_SECRET"));

      setCookie({
        tokenName: app.get("JWT_COOKIE_NAME"),
        token,
        res: req.res,
      });
      console.log('just curetaed user info ' + user)
      return {
        token,
        user
      };
    } catch (e) {
      throw new AuthenticationError(e);
    }
  },

  async login(
    parent,
    {
      user: { email, password },
    },
    { pgResource, req },
  ) {
    console.log('@@@@@@@@@@login triggered, mutations line 127')

    try {
      console.log('login' + JSON.stringify(email))
      const user = await pgResource.getUserAndPasswordForVerification(
        email
      );
      if (!user) throw "User was not found.";
      /**
       *  @TODO: Authentication - Server
       *
       *  To verify the user has provided the correct password, we'll use the provided password
       *  they submitted from the login form to decrypt the 'hashed' version stored in out database.
       */
      // Use bcrypt to compare the provided password to 'hashed' password stored in your database.
      let valid = await bcrypt.compare(password, user.password);
        console.log('bcrypt password Valid? ' + valid)
      // const valid = false;
      // -------------------------------
      if (!valid) throw "Invalid Password";

      const token = generateToken(user, app.get("JWT_SECRET"));

      setCookie({
        tokenName: app.get("JWT_COOKIE_NAME"),
        token,
        res: req.res,
      });

      return {
        token,
        user,
      };
    } catch (e) {
      throw new AuthenticationError(e);
    }
  },

  async logout(parent, args, context) {
    console.log('logOUT run')
    context.req.res.clearCookie(app.get("JWT_COOKIE_NAME"));
    return true;
  },

  async addItem(parent, args, {pgResource}, info) {
    const {title, description, imageUrl, itemowner} = args.item
    console.log('addItem run:!!!!!!!!!!!!!!' + JSON.stringify(imageUrl))
    const newItem = await pgResource.saveNewItem(
      args.item
    );
    return newItem;
  },

  async borrowItem(parent, args, {pgResource, user}, info) {
    console.log('borrowItem run:!!!!!!!!!!!!!!' + JSON.stringify(args.item.id))
    console.log('borrowItem run:!!!!!!!!!!!!!!' + JSON.stringify(user.id))

    const newItem = await pgResource.borrowItem(
      parseInt(args.item.id),  
      user.id
    );
    return newItem;
  },
});
module.exports = mutationResolvers;
