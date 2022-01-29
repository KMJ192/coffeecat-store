// import { cors } from "cors";
// import express from "express";
// import { productList } from "./template/data";

const cors = require("cors");
const express = require("express");
const {
  productList,
  productOption1,
  productOption2,
  productOption3,
  productOption4,
  productOption5,
  productOption6,
  productOption7,
  productOption8,
  productOption9,
  productOption10,
  productOption11,
  productOption12,
} = require("./template/data");

const app = express();
const port = 3001;

app.use(cors());
app.use("/images", express.static("images"));

app.get("/", (req, res) =>
  res.send(
    "2021 하반기 프론트엔드 dev-matching 커피캣 스토어 spa문제 풀이 연습용 서버"
  )
);
app.get("/product-list", (req, res) => res.send(productList));
app.get("/product/1", (req, res) => {
  res.send(productOption1);
});
app.get("/product/2", (req, res) => {
  res.send(productOption2);
});

app.get("/product/3", (req, res) => {
  res.send(productOption3);
});

app.get("/product/4", (req, res) => {
  res.send(productOption4);
});

app.get("/product/5", (req, res) => {
  res.send(productOption5);
});

app.get("/product/6", (req, res) => {
  res.send(productOption6);
});

app.get("/product/7", (req, res) => {
  res.send(productOption7);
});

app.get("/product/8", (req, res) => {
  res.send(productOption8);
});

app.get("/product/9", (req, res) => {
  res.send(productOption9);
});

app.get("/product/10", (req, res) => {
  res.send(productOption10);
});

app.get("/product/11", (req, res) => {
  res.send(productOption11);
});

app.get("/product/12", (req, res) => {
  res.send(productOption12);
});

app.listen(port);
