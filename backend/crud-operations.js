import express from "express";
import morgan from "morgan";
// import db from './db/index.js'
import * as db from './db/index.js';
import cors from "cors";

const app = express()
const port = process.env.PORT || 3000;

// app.use(morgan("dev"))
// app.use((req, res, next) => {
//     console.log("middleware")
//     next()
// })
app.use(cors());
app.use(express.json())

app.get('/api/v1/users', async (req, res) => {
    try {
    const results = await db.query("select * from users");
    console.log(results.rows);
    res.status(200).json({
        status: "success",
        results: results.rowCount,
        data: {
            username: results.rows,
        },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
        status: "error",
        message: "An error occurred while fetching users"
    });
}
});
    

app.get('/api/v1/users/:userid', async (req, res) => {
    const userid = req.params.userid;
    console.log("Requested user ID:", userid);
    try {
        const results = await db.query("SELECT * FROM users WHERE userid = $1", [userid]);
        if (results.rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: {
                user: results.rows[0]
            }
        });
        console.log(results.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "error",
            message: "An error occurred while fetching the user"
        });
    }
});
        

app.post('/api/v1/users', async (req, res) => {
console.log(req.body.username)
try {
    if (!req.body.username || !req.body.email) {
        return res.status(400).json({
          status: "error",
          message: "Username and email are required"
        });
      }
    const results = await db.query(
        "INSERT INTO users (username, email, prompt) VALUES ($1, $2, $3) RETURNING *",
      [req.body.username, req.body.email, req.body.prompt || null]
    );
    res.status(201).json({
        status: "success",
        data: {
            users: results.rows[0],
        }
    })
} catch (err) {
    console.error(err);
    res.status(500).json({
        status: "error",
        message: "An error ocurred when creating post"
    });

}})


app.put('/api/v1/users/:userid', async (req, res) => {
    console.log('Request body:', req.body);
    try {
      if (!req.body.username || !req.body.email) {
        return res.status(400).json({
          status: "error",
          message: "Username and email are required"
        });
      }
      
      const results = await db.query(
        "UPDATE users SET username = $1, email = $2, prompt = $3 WHERE userid = $4 RETURNING *",
        [req.body.username, req.body.email, req.body.prompt || null, req.params.userid]
      );
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "User not found"
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          user: results.rows[0],
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "An error occurred when updating user"
      });
    }
  });

app.delete('/api/v1/users/:userid', async (req, res) => {
    try {
      const results = await db.query(
        "DELETE FROM users WHERE userid = $1 RETURNING *",
        [req.params.userid]
      );
  
      if (results.rows.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "User not found"
        });
      }
  
      res.status(200).json({
        status: "success",
        data: {
          user: results.rows[0],
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "error",
        message: "An error occurred when deleting user"
      });
    }
  });
  
app.listen(port, () => {
console.log(`server running on port ${port}`)
})