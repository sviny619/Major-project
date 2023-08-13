const express = require("express");
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const nodeplotlib = require('nodeplotlib');
const csvFilePath = "public/trial_1.csv";

app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/load", function (req, res) {
  res.redirect("/plotGraph");
});
app.get("/plotGraph", function (req, res) {
  fs.readFile(csvFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const lines = data.trim().split("\n");
    // const xValues = [];
    const yValues = [];

    lines.slice(1).forEach((line) => {
      const columns = line.split(",");
      // xValues.push(columns[0]); // Assuming 4th column is the x axis
      const yValue = parseFloat(columns[2]);
      yValues.push(yValue); // Assuming 3rd column is the y axis
    });
    const xValues = Array.from(
      { length: yValues.length },
      (_, index) => index + 1
    );
    // Process the CSV data (you can replace this with your own logic)
    console.log(xValues);
    const trace = {
      x: xValues,
      y: yValues,
      type: 'scatter'
    };

    const layout = {
      title: 'My Plot',
      xaxis: {
        title: 'X-axis'
      },
      yaxis: {
        title: 'Y-axis'
      }
    };

    nodeplotlib.plot([trace], layout, (err, fig) => {
      if (err) {
          console.error('Error plotting graph:', err);
          return res.status(500).send('Error plotting graph');
      }

      const buffer = fig.renderSync({ format: 'png' });
      
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      res.set('Pragma', 'no-cache');
     
      res.set('Expires', '0');
      res.set('Content-Type', 'image/png');

      res.send(buffer);
  });
    
  });
});
app.listen(3000, function () {
  console.log("server is running on port 3000");
});
