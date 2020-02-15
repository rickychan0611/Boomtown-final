function tagsQueryString(tags, itemid, result) {
  for (i = tags.length; i > 0; i--) {
    result += `($${i}, ${itemid}),`;
  }
  return result.slice(0, -1) + ";";
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *", // @TODO: Authentication - Server
        values: [fullname, email, password],
      };
      try {
        const user = await postgres.query(newUserInsert.text, newUserInsert.values);
        console.log("New user created: " + user.rows[0].fullname)
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw "An account with this username already exists.";
          case /users_email_key/.test(e.message):
            throw "An account with this email already exists.";
          default:
            throw e
          // throw "There was a problem creating your account.";
        }
      }
    },
    async saveNewItem({ title, description, imageUrl }) {
      console.log("saveNewItem RUN" + title, description, imageUrl)
      const newItemInsert = {
        text: "INSERT INTO items (title, description, imageurl) VALUES ($1, $2, $3) RETURNING *", // @TODO: Authentication - Server
        values: [title, description, imageUrl],
      };
      try {
        const item = await postgres.query(newItemInsert.text, newItemInsert.values);
        console.log("New ITEM created: " + item.rows[0].title)
        return item.rows[0];
      } catch (e) {
        console.log(e)
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: "SELECT * FROM users WHERE email = $1", // @TODO: Authentication - Server
        values: [email],
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw "User was not found.";
        console.log("loging" + JSON.stringify(user.rows[0]))
        return user.rows[0];
      } catch (e) {
        throw "User was not found.";
      }
    },
    async getUserById(id) {
      console.log("GetUserByID")
      const findUserQuery = {
        text: `SELECT * FROM users WHERE id = $1`, // @TODO: Basic queries
        values: [id], //$1 is the 1st arrg in
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user.rows[0]) throw "user was not found";
        return user.rows[0];
      } catch (e) {
        throw "500 error. User ID was not found, dude!";
      }

      // -------------------------------
    },

    //GET ALL ITEMS
    async getItems(idToOmit) {
      console.log('idToOmit' + idToOmit)
      try {
        const items = await postgres.query({
          text: `SELECT * FROM items WHERE (itemowner != $1)`,
          values: idToOmit ? [idToOmit] : [],
        });
        return items.rows;
      }
      catch (e) {
        console.log(e)
        throw "500 error. items were not found, dude!";
      }
    },


    async getItemsForUser(id) {
      try {

        const items = await postgres.query({
          /**
           *  @TODO:
           *  Get all Items for user using their id, DONE!
           */
          text: `SELECT * FROM items WHERE itemowner = $1`,
          values: [id],
        });

        console.log(items.rows)
        return items.rows;
      } catch (e) {
        throw "500 error. items were not found, dude!";
      }
    },
    async getBorrowedItemsForUser(id) {
      try {
        const items = await postgres.query({
          /**
           *  @TODO:
           *  Get all Items borrowed by user using their id
           */
          text: `SELECT * FROM items WHERE borrower = $1`,
          values: [id],
        });
        return items.rows;
      }
      catch (e) {
        throw "500 error. borrower id were not found";
      }
    },
    async getBorrower(id) {
      try {
        console.log("getBorrower" + JSON.stringify(id))
        const items = await postgres.query({
          text: `SELECT * FROM users 
        WHERE id = $1`,
          values: [id]
        });
        console.log("id: " + id + JSON.stringify(items.rows[0]))
        return items.rows[0];
      }
      catch (e) {
        throw e + "500 error. borrower id were not found";
      }
    },
    async getTags() {
      try {
        // console.log('getTags')
        const tags = await postgres.query({
          text: "SELECT * FROM tags",
          values: [],
        });
        return tags.rows;
      }
      catch (e) {
        throw "500 error. tags were not found";
      }
    },
    async getTagsForItem(id) {
      try {
        console.log('getTagsForItem run')
        const tagsQuery = await postgres.query({
          text:
            `
        SELECT * FROM tags_items
        INNER JOIN items
        ON tags_items.item_id = items.id
        INNER JOIN tags
        ON tags_items.tag_id = tags.id
        WHERE items.id = $1
        ` ,
          values: [id],
        });
        console.log(tagsQuery.rows)
        return tagsQuery.rows;
      }
      catch (e) {
        throw e;
      }
    },
    // async saveNewItem({ item, user }) {
    //   console.log("saveNewItem triggered " + JSON.stringify(item))
      
    //   return new Promise((resolve, reject) => {
        
    //     postgres.connect((err, client, done) => {
    //       item = item.item;
    //       try {
    //         // Begin postgres transaction
    //         client.query("BEGIN", async err => {
    //           console.log('resolve in pg:', item)
    //           const { title, description, tags } = item;
    //           const newItemInsert = {
    //             text: "INSERT INTO items (title, description) VALUES ($1, $2) RETURNING *",// @TODO: Authentication - Server
    //             values: [title, description],
    //           };
    //           const newItem = await client.query(newItemInsert.text, newItemInsert.values)
    //           console.log(`new item is ${JSON.stringify(newItem)}`);
    //           console.log(JSON.stringify(tags[0].id))
    //           console.log(JSON.stringify(tagsQueryString(tags[0].id, newItem.rows[0].id, "VALUES ")))
    //           const insertItemTags = "INSERT INTO tags_items (tag_id, item_id)"
    //             + tagsQueryString(tags[0].id, newItem.rows[0].id, "VALUES ")
    //           const insertItemTagsValues = tags[0].id
    //           await client.query(insertItemTags, insertItemTagsValues)

    //           // Commit the entire transaction!
    //           client.query("COMMIT", err => {
    //             if (err) {
    //               throw err;
    //             }
    //             // release the client back to the pool
    //             done();
    //             // Uncomment this resolve statement when you're ready!
    //             resolve(newItem.rows[0])
    //             // -------------------------------
    //           });
    //         });
    //       } catch (e) {
    //         // Something went wrong
    //         client.query("ROLLBACK", err => {
    //           if (err) {
    //             throw err;
    //           }
    //           // release the client back to the pool
    //           done();
    //         });
    //         switch (true) {
    //           default:
    //             throw e;
    //         }
    //       }
    //     });
    //   });
    // },
  };
};
