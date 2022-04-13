const fs = require("fs");

function orderItems(items) {
  return items
    .sort((a, b) => {
      const numA = a.slice(2);
      const numB = b.slice(2);
      return numA - numB;
    })
    .reverse();
}

function main() {
  const items = {};
  // read the csv file
  const csv = fs.readFileSync("exercise_input.csv", "utf8");

  csv
    .trim()
    .split("\n")
    .forEach((line) => {
      const lines = line.trim().split(",");
      const orderedItems = orderItems(lines.slice(3));
      orderedItems.forEach((i) => {
        const itemName = i.slice(0, 2);
        //  check if item is in items
        if (items[itemName]) {
          items[itemName].votes += +i.slice(2);
          items[itemName].voters.push(lines[1]);
        } else {
          items[itemName] = {
            votes: +i.slice(2),
            voters: [lines[1]],
          };
        }
      });
    });

  const sorted = Object.entries(items)
    .sort((a, b) => {
      return b[1].votes - a[1].votes;
    })
    .slice(1);

  sorted.forEach((item) => {
    console.log(
      `Item: ${item[0]}, Votes: ${item[1].votes}, Voters: ${item[1].voters}`
    );
  });
}

main();
