const fs = require("fs");

// read the csv file
const csv = fs.readFileSync("exercise_input.csv", "utf8");

const result = csv
  .trim()
  .split("\n")
  .map((line) => {
    const lines = line.trim().split(",");
    const orderedItems = orderItems(lines.slice(3));
    return orderedItems.map((i) => {
      return {
        voter: lines[1],
        votes: +i.slice(2),
        item: i.slice(0, 2),
      };
    });
  });

function orderItems(items) {
  return items
    .sort((a, b) => {
      const numA = a.slice(2);
      const numB = b.slice(2);
      return numA - numB;
    })
    .reverse();
}

result.forEach((item) => {
  item.forEach((i) => {
    console.log(`Voter: "${i.voter}", Item: "${i.item}", Votes: "${i.votes}"`);
  });
  console.log("----------------------------------------");
});
