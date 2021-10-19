const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write(`
            <html>
                <head>
                    <title>Welcome</title>
                </head>
                <body>
                    <h1>Welcome you to my website</h1>
                    <form action='create-user' method='POST'>
                        Username: <input type='text' name='username'/><br/>
                        <button>submit</button>
                    </form>
                    <a href='/users'>See all user</a>
                </body>
            </html>
        `);
    return res.end();
  }
  if (url === "/users" && method === "GET") {
    return fs.readFile("./list-users.txt", (err, data) => {
      if (err) {
        res.write(`
                    <html>
                        <head>
                            <title>Users</title>
                        </head>
                        <body>
                            <h1>Co loi da xay ra</h1>
                        </body>
                    </html>
                `);
        console.log("loi doc file");
        return res.end();
      } else {
        const listUsers = data.toString().split("\n");
        res.write(`
                    <html>
                        <head>
                            <title>Users</title>
                        </head>
                        <body>
                            <h1>List users</h1>
                            <ul>
                                `);
        for (let username of listUsers) {
          if (username === "") return;
          res.write(`<li>${username}</li>`);
        }
        res.write(`
                            </ul>
                        </body>
                    </html>
                `);
        return res.end();
      }
    });
  }
  if (url === "/create-user" && method === "POST") {
    let body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1] + "\n";
      fs.appendFile("list-users.txt", username, (err) => {
        if (err) {
          console.log("co loi xay ra");
        } else {
          console.log("add user successfullt");
        }
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

module.exports = requestHandler;
