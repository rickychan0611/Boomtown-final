const { ApolloError } = require("apollo-server");

const queryResolvers = app => ({

  viewer(parent, args, { user }, info) {
    console.log('!!: ', user)
    return user;
  },
  
  async user(parent, { id }, { pgResource, user }, info) {
    try {
      console.log("user query run")
      // app.use(cookieParser())
 
    // app.get('/', function (req, res) {
    //   // Cookies that have not been signed
    //   console.log('Cookies: ', req.cookies)
    
    //   // Cookies that have been signed
    //   console.log('Signed Cookies: ', req.signedCookies)
    // })
    console.log('from queries: ', user)
      const userData = await pgResource.getUserById(user.id);
      return userData;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  async items(parent, { id }, { pgResource }, info) {
    try {
      console.log('item query run!!!!!')
      const items = await pgResource.getItems(id);
      return items;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  async tags(parent, { id }, { pgResource }, info)  {
    try {
      const tags = await pgResource.getTags(id);
      return tags;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
});
module.exports = queryResolvers;

