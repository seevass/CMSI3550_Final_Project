import net from "net";

const API_KEY = 'INSERT YOUR API KEY HERE AND LEAVE THE SINGLE QUOTES';
const API_URL = 'https://api.openai.com/v1/completions';

const server = net.createServer((socket) => {
  console.log(
    "Connection from",
    socket.remoteAddress,
    "port",
    socket.remotePort
  );

  socket.on("data", async (buffer) => {
    console.log(
      "Request from",
      socket.remoteAddress,
      "port",
      socket.remotePort
    );
    //output
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-002',
        prompt: buffer.toString(),
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });
    const responseText = await response.text();
    const responseJSON = JSON.parse(responseText);
    const chatbotResponse = responseJSON.choices[0].text;
    socket.write(`${chatbotResponse}\n`);
  });


  socket.on("end", () => {
    console.log("Closed", socket.remoteAddress, "port", socket.remotePort);
  });
});

server.maxConnections = 20;
server.listen(59898);
