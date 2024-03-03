const express = require("express");
// import express from "express";
// const nanoid = require('nanoid');
const shortid = require("shortid");
const fs = require("node:fs");
const path = require("path");
const filePath = path.join(__dirname, "url_map.json");
const file_html = path.join(__dirname, "index.html");
const app = express();
const port = 10000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    
    // res.json({
    //     success: true,
    //     massage: "Successfully Installed"
    // })
    res.sendFile(file_html);
})

app.post("/url-sortner", function (req, res) {
//   const long_url = req.body.url;
//     // console.log(long_url);
  const long_url = req.body.longUrl;
    //   console.log("Received payload:", payload);
  const short_url = shortid.generate();
  // --------------------------------------------------

  const fileRes = fs.readFileSync(filePath);
  const fileData = JSON.parse(fileRes.toString());

  fileData[short_url] = long_url;
  fs.writeFileSync(filePath, JSON.stringify(fileData));

  //----------------------------------------------------
  res.json({
    success: true,
    url: `https://url-shortner-dwhp.onrender.com/` + short_url,
    massage: "Above URL is shorted, you can use it !",
  });
});

app.get("/:short_url", (req, res) => {
  const fileRes = fs.readFileSync(filePath);
  const fileData = JSON.parse(fileRes.toString());
  const long_url = fileData[req.params.short_url];
    // console.log(long_url);
    res.redirect(long_url);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
