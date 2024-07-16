const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/signup', (req, res) => {
  const { name, email, password, phone } = req.body;

   fs.readFile('./users.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading users file');
    }

    const users = JSON.parse(data);
    users.push({ name, email, password, phone });

    // Write updated users back to users.json
    fs.writeFile('./users.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error saving user data');
      }
      res.status(200).send('User registered successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
