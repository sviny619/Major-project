document.getElementById("loadButton").addEventListener("click", function() {
    // Simulate loading the CSV file (replace this with actual code to load the CSV)
    const csvData = "Name,Age,Location\nJohn,25,New York\nJane,30,Los Angeles";

    // Split CSV data into rows
    const rows = csvData.split('\n');

    // Create an HTML table to display the CSV data
    const table = document.createElement('table');
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].split(',');
        const row = document.createElement('tr');
        for (let j = 0; j < cells.length; j++) {
            const cell = document.createElement(i === 0 ? 'th' : 'td');
            cell.textContent = cells[j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    // Replace existing data with the new table
    const csvContainer = document.getElementById('csvData');
    csvContainer.innerHTML = '';
    csvContainer.appendChild(table);
});
