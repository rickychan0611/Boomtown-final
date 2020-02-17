const { ApolloError } = require("apollo-server");

const queryResolvers = app => ({

  viewer(parent, args, { user }, info) {
    console.log('!!: ', user)
    return user;
  },
  
  async user(parent, { id }, { pgResource, user }, info) {
    try {
      const userData = await pgResource.getUserById(user.id);
      return userData;
    } catch (e) {
      throw new ApolloError(e);
    }
  },

  // async itemowner(parent, { id }, { pgResource, user }, info) {
  //   try {
  //     console.log("user query run" + id)
  //   console.log('from queries: ', user)
  //     const userData = await pgResource.getUserById(id);
  //     return userData;
  //   } catch (e) {
  //     throw new ApolloError(e);
  //   }
  // },
  
  async items(parent, { id }, { pgResource, user }, info) {
    try {
      const items = await pgResource.getItems(id
        );
      console.log('item query run!!!!!' + JSON.stringify(user))
      return items;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  async owneritems(parent, { id }, { pgResource, user }, info) {
    try {
      console.log('item getOwnerItems run!!!!!')
      const items = await pgResource.getOwnerItems(user.id);
      return items;
    } catch (e) {
      throw new ApolloError(e);
    }
  },
  // async tags(parent, { id }, { pgResource }, info)  {
  //   try {
  //     const tags = await pgResource.getTags(id);
  //     return tags;
  //   } catch (e) {
  //     throw new ApolloError(e);
  //   }
  // },
});
module.exports = queryResolvers;

