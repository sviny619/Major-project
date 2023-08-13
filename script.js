document.getElementById("loadButton").addEventListener("click", function () {
  // Simulate loading the CSV file (replace this with actual code to load the CSV)
  const csvData = "Name,Age,Location\nJohn,25,New York\nJane,30,Los Angeles";

  // Split CSV data into rows
  const rows = csvData.split("\n");

  // Create an HTML table to display the CSV data
  const table = document.createElement("table");
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].split(",");
    const row = document.createElement("tr");
    for (let j = 0; j < cells.length; j++) {
      const cell = document.createElement(i === 0 ? "th" : "td");
      cell.textContent = cells[j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  // Replace existing data with the new table
  const csvContainer = document.getElementById("csvData");
  csvContainer.innerHTML = "";
  csvContainer.appendChild(table);

  fetch("/plotGraph")
    .then((response) => response.json())
    .then((data) => {
      const xValues = data.xValues.map((value) => parseFloat(value));
      const yValues = data.yValues.map((value) => parseFloat(value));

      // Create an HTML table to display the CSV data
      const table = document.createElement("table");
      for (let i = 0; i < xValues.length; i++) {
        const row = document.createElement("tr");
        const xCell = document.createElement("td");
        xCell.textContent = xValues[i];
        row.appendChild(xCell);
        const yCell = document.createElement("td");
        yCell.textContent = yValues[i];
        row.appendChild(yCell);
        table.appendChild(row);
      }
      const csvContainer = document.getElementById("csvData");
      csvContainer.innerHTML = "";
      csvContainer.appendChild(table);
      const ctx = document.getElementById("myChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              label: "Y-axis Data",
              data: yValues,
              borderColor: "rgba(75, 192, 192, 1)",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: "X Values",
              },
            },
            y: {
              title: {
                display: true,
                text: "Y Values",
              },
            },
          },
        },
      });
    })
    .catch((error) => console.error("Error fetching or plotting data:", error));
});
