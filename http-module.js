
// const http = require("http"); old method
import http from "http"

// http is a core module that is used to create a server

const books = [{ id: 1, name: "Death Note", author: "Light Yagami" }];

const server = http.createServer((req, res) => {
  if (req.method == "GET" && req.url == "/") {
    res.end("Welcome to Backend O_O ");
  } else if (req.method == "GET" && req.url == "/books") {
    res.end(
      `${books.map((book) => `${book.id}. ${book.name} by ${book.author}`)}`
    );
  } else if (req.method == "GET" && req.url == "/products") {
    res.end("My Products ...");
  } else res.end("Oh snap looks like you are lost X_X");
});

const backendPort = 8000;

server.listen(backendPort, () =>
  console.log(`Server is running on port ${backendPort}`)
);
