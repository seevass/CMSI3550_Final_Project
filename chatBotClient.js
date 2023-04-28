import net from "net";
import readline from "readline";

const client = new net.Socket();
//connect to server
client.connect(59898, process.argv[2] ?? "localhost", () => {
  console.log("Connected to server");
});
//recieve data from server
client.on("data", (data) => {
  console.log(data.toString("utf-8"));
});

//? read input and send to server
const reader = readline.createInterface({ input: process.stdin });
reader.on("line", (line) => {
  client.write(`${line}\n`);
});
reader.on("close", () => {
  client.end();
});
