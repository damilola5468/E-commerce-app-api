const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const knex = require("knex");
var app = express();
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
app.use(cors());
const multer = require("multer");

// const upload multer({dest: '../src/components/image/'})
const PORT = process.env.PORT || 7000;
// const PORT = 7000;
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

client.connect();

// Serve any static files
app.use(express.static(path.join(__dirname, "../build/")));

// Handle React routing, return all requests to React app
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../build/", "index.html"));
});

// app.use(express.static("public"));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "../build/index.html"));
// });
// mysqlConnection.connect(err => {
//   if (!err) {
//     console.log("Db Connection created!");
//   } else {
//     console.log("Db Connection Failed: !");
//   }
// });

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.post("/c/products", (req, res) => {
  var sql = "SELECT * FROM Products ";
  client.query(sql, (err, result) => {
    console.log(err);
    let products = [],
      id = null;
    let cart = JSON.parse(req.body.cart);
    if (!cart) return res.json(products);
    for (var i = 0; i < result.length; i++) {
      id = result[i].id.toString();
      if (cart.hasOwnProperty(id)) {
        result[i].qty = cart[id];
        products.push(result[i]);
      }
    }
    return res.json(products);
  });
  // client.end();
  // mysqlConnection.end();
});

app.post("/api/auth", (req, res) => {
  var sql = "SELECT * FROM custormers";
  client.query(sql, (err, result) => {
    console.log(err);
    let user = result.filter(user => {
      return (
        user.email === req.body.email && user.password === req.body.password
      );
    });
    if (user.length) {
      let token_payload = {
        email: user[0].email,
        password: user[0].password
      };
      let token = jwt.sign(token_payload, "jwt_secret_password", {
        expiresIn: "2h"
      });
      let response = {
        message: "Token Created, Authentication Successful!",
        token: token
      };

      return res.status(200).json(response);
    } else {
      return res.status("409").json("Authentication failed. User not found.");
    }
  });
  // client.end();
  // mysqlConnection.end();
});

app.get("/Products", function(req, res) {
  var sql = "SELECT * FROM Products ORDER BY id DESC;";
  client.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
  // client.end();
  // mysqlConnection.end();
});

app.get("/Type", function(req, res) {
  var sql = "SELECT * FROM type;";
  client.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
  // client.end();
  // mysqlConnection.end();
});

app.get("/SubCat/:id", (req, res) => {
  client.query(
    "SELECT * FROM subcategory WHERE cat_id =" + req.params.id + ";",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/SububCat/:id", (req, res) => {
  client.query(
    "SELECT * FROM sububcategory WHERE sub_category_id =" + req.params.id + ";",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/Sububproduct/:id", (req, res) => {
  client.query(
    "SELECT * FROM products WHERE subub_category_id =" + req.params.id + ";",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/allSububproduct/:id", (req, res) => {
  client.query(
    "SELECT * FROM products WHERE subub_category_id =" + req.params.id + ";",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/subSubCat/:id", (req, res) => {
  client.query(
    "SELECT * FROM sububcategory WHERE sub_category_id =" + req.params.id + ";",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/SubCatpro/:id", (req, res) => {
  client.query(
    "SELECT * FROM products WHERE sub_category =" +
      req.params.id +
      " ORDER BY id DESC;",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/Sububpro/:id", (req, res) => {
  client.query(
    "SELECT * FROM products WHERE sub_category =" +
      req.params.id +
      " ORDER BY id DESC;",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.post("/Products/", function(req, res) {
  var sql = "SELECT * FROM products ORDER BY id DESC;";
  client.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
  // client.end();
  // mysqlConnection.end();
});

app.get("/product/:name", (req, res) => {
  client.query(
    "SELECT * FROM products WHERE name LIKE '%" + [req.params.name] + "%';",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/pro/:id", (req, res) => {
  client.query(
    "Delete FROM products WHERE id =" + req.params.id + ";",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

//

app.get("/product_id/:id", (req, res) => {
  client.query(
    "Select * FROM products WHERE id =" + req.params.id + ";",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/pay/:email", (req, res) => {
  client.query(
    "SELECT * FROM custormers WHERE email ='" + req.params.email + "';",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/cat/:id", (req, res) => {
  client.query(
    "Delete FROM category WHERE id =" + req.params.id + ";",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/subcat/del/:id", (req, res) => {
  client.query(
    "Delete FROM subcategory WHERE id =" + req.params.id + ";",
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // mysqlConnection.end();
});

app.get("/sububcat/del/:id", (req, res) => {
  client.query(
    "Delete FROM sububcategory WHERE id =" + req.params.id + ";",
    (err, rows, fields) => {
      if (!err) res.json("true");
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/custom", (req, res) => {
  client.query("SELECT * FROM custormers;", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
  // mysqlConnection.end();
});

// app.get("/custom-count", (req, res) => {
//    client.query(
//     "SELECT COUNT(*) FROM custormers",
//     (err, rows, fields) => {
//       if (!err) res.send(rows);
//       else console.log(err);
//     }
//   );
//   // mysqlConnection.end();
// });

app.get("/custom-count", (req, res) => {
  client.query(
    "SELECT COUNT(*) as total FROM custormers;",
    (err, rows, fields) => {
      if (!err) res.json(rows[0].total);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/product-count", (req, res) => {
  client.query(
    "SELECT COUNT(*) as total FROM products;",
    (err, rows, fields) => {
      if (!err) res.json(rows[0].total);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/cat-count", (req, res) => {
  client.query(
    "SELECT COUNT(*) as total FROM category;",
    (err, rows, fields) => {
      if (!err) res.json(rows[0].total);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/catepro/:category", (req, res) => {
  client.query(
    "SELECT * FROM products WHERE category = ?;",
    [req.params.category],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/subcategory", function(req, res) {
  var sql = "SELECT * FROM subcategory;";
  client.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
  // client.end();
  // mysqlConnection.end();
});

app.get("/subsubcategory", function(req, res) {
  var sql = "SELECT * FROM sububcategory;";
  client.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
  // client.end();
  // mysqlConnection.end();
});

app.post("/category", function(req, res) {
  var sql = "SELECT * FROM category ORDER BY id DESC;";
  client.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
  // client.end();
  // mysqlConnection.end();
});

app.get("/category", function(req, res) {
  var sql = "SELECT * FROM category ORDER BY id DESC;";
  client.query(sql, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.send(result);
  });
  // client.end();
  // mysqlConnection.end();
});

app.get("/cat-admin-list/:id", (req, res) => {
  client.query(
    "SELECT * FROM category WHERE id = ?;",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/subsub-admin-list/:id", (req, res) => {
  client.query(
    "SELECT * FROM sububcategory WHERE id = ?;",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/subub-admin-list/:id", (req, res) => {
  client.query(
    "SELECT * FROM subcategory WHERE id = ?;",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.get("/product/:id", (req, res) => {
  client.query(
    "SELECT * FROM products WHERE id = ?;",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
  // client.end();
  // mysqlConnection.end();
});

app.post("/delivery", (req, res) => {
  let post = req.body;

  client.query(
    "SELECT count(*) as tiol from delivery_information WHERE email = ?;",
    [post.email],
    (err, result, fields) => {
      if (result[0].tiol === 1) {
        console.log(result[0].tiol);
        console.log(post.email);

        var sql =
          "UPDATE delivery_information SET firstname=?,lastname=? ,email=?,phone=?,phone_2=?,address=?,user_id=? WHERE email = ?;";
        client.query(
          sql,
          [
            post.firstname,
            post.lastname,
            post.email,
            post.phone,
            post.phone2,
            post.address,
            post.id,
            post.email
          ],
          (err, rows, fields) => {
            if (!err) console.log("User Data Inserted");

            console.log(err);
          }
        );
        return res.json("Ordering Step 1 Successful");
      } else {
        var sql =
          "INSERT INTO delivery_information (firstname, lastname, email, phone, phone_2, address,user_id) VALUES (?,?,?,?,?,?,?);";
        client.query(
          sql,
          [
            post.firstname,
            post.lastname,
            post.email,
            post.phone,
            post.phone2,
            post.address,
            post.id
          ],
          (err, rows, fields) => {
            if (!err) console.log("User Data Inserted");

            console.log(err);
          }
        );
        // client.end();
        return res.json("Ordering Step 1 Successful");
      }
    }
  );
});

// app.delete("/product/:id", (req, res) => {
//    client.query(
//     "DELETE FROM product WHERE id = ?",
//     [req.params.id],
//     (err, rows, fields) => {
//       if (!err) res.send(" Patients Data Deleted successfully.");
//       else console.log(err);
//     }
//   );
// });

// app.post("/check", (req, res) => {
//   var sql =
//     "SELECT * FROM custormers where email =" +
//     req.email +
//     " and phone =" +
//     req.phone +
//     "";
//    client.query(sql, (err, rows, fields) => {
//     if (rows)
//       return res.status("405").json("User with email and phone already exist.");
//     console.log(err, req.email);
//   });
// });

app.post("/check", (req, res) => {
  let post = req.body;
  // var sql =
  //   "SELECT count(*) as total FROM custormers where email='" +
  //   post.email + "'and phone ='" +  post.phone + "'";
  var sql2 = "SELECT * FROM custormers where email='" + post.email + "';";
  var sql3 = "SELECT * FROM custormers where phone='" + post.phone + "';";

  client.query(sql3, (err, result3, fields) => {
    if (result3 === true) {
      return res.json("Signup Failed Email or Phone Already Exist!!");
    }
    client.query(sql2, (err, result2, fields) => {
      // console.log(result[0].total);
      if (result2 === true) {
        return res.json("Signup Failed Email or Phone Already Exist!!");
      } else {
        let post = req.body;
        var sql =
          "INSERT INTO custormers (firstname, lastname, email, phone, password, address) VALUES (?,?,?,?,?,?);";
        client.query(
          sql,
          [
            post.firstname,
            post.lastname,
            post.email,
            post.phone,
            post.password,
            post.address
          ],
          (err, rows, fields) => {
            if (!err) console.log("User Data Inserted");

            console.log(err);
          }
        );
        return res.json("Signup Successful!!!");
      }
    });
    // client.end();
    // mysqlConnection.end();
  });
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "src/components/image/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
});

// app.post("/ins/product2",upload.array('img', 2), (req, res) => {
//   let files = req.files;
//   res.send(files[0].originalname);
//   var sql = 'UPDATE `products` SET `image_path` = 'jcjcj' WHERE `products`.`id` = 61';
//
// });

app.post("/ins/product", upload.array("img", 2), (req, res) => {
  let body = req.body;
  let files = req.files;
  // var upload = multer({dest: '../src/components/image/'});

  const dir = "./image/";
  var sql =
    "INSERT INTO products (name, category, available_quantity, description,image_path, price,image_path_2, size, type, sub_category, subub_category_id) VALUES (?,?,?,?,?,?,?,?,?,?,?);";

  client.query(
    sql,
    [
      body.name,
      body.category,
      body.amount,
      body.description,
      dir + files[0].originalname,
      body.price,
      dir + files[1].originalname,
      body.size,
      body.type,
      body.sub_cat,
      body.subub_cat
    ],
    (err, rows, fields) => {
      if (!err) console.log("Product Data 1 Inserted");

      console.log(err);
    }
  );
  // client.end();
  return res.json("Inserted Successfully");

  // mysqlConnection.end();
});

app.post("/ins/cate", (req, res) => {
  let body = req.body;

  var cg = "SELECT count(*) as tl from category;";
  client.query(cg, (err, result, fields) => {
    console.log(result.tl);
    if (result[0].tl === 8) {
      return res.json("Category Limit is 8!!!");
    } else {
      var sql =
        "INSERT INTO category (category_name, description) VALUES (?,?);";
      client.query(
        sql,
        [body.category, body.description],
        (err, rows, fields) => {
          if (!err) return res.json("Inserted Successfully");
          console.log(err);
          return res.json("Insertion not Successful");
        }
      );
    }
  });
  // client.end();
  // mysqlConnection.end();
});

app.post("/ins/sub-sub-cate", (req, res) => {
  let body = req.body;

  var sql = "INSERT INTO sububcategory (name, sub_category_id) VALUES (?,?);";
  client.query(sql, [body.name, body.sub_cat_id], (err, rows, fields) => {
    if (!err) return res.json("Inserted Successfully");
    console.log(err);
    return res.json("Insertion not Successful");
  });
  // client.end();
});

app.post("/ins/sub-cate", (req, res) => {
  let body = req.body;

  var sql = "INSERT INTO subcategory (sub_cat_name, cat_id) VALUES (?,?);";
  client.query(sql, [body.sub_cat_name, body.cat_id], (err, rows, fields) => {
    if (!err) return res.json("Inserted Successfully");
    console.log(err);
    return res.json("Insertion not Successful");
  });
  // client.end();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
