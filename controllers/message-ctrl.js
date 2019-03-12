const Message = require("../models/message-md");

exports.sendMessage = (req, res) => {
  const { email, message } = req.body;
  const newMsg = new Message(email, message);
  newMsg.create().then(() => {
    res.send("Message Sent");
  }).catch(() => {
    res.send("Message unsent");
  });
}