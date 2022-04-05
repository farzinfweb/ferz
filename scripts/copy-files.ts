const fs = require("fs");
const path = require("path");

// relative to scripts directory
const destinations = [["../README.md", "../packages/ferz/README.md"]];

destinations.forEach(([src, dest]) => {
  fs.copyFileSync(path.resolve(__dirname, src), path.resolve(__dirname, dest));
});
