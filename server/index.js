const express = require('express')
const cors = require('cors')
const path = require('path')
const axios = require('axios')
require("dotenv").config({ path: ".env" });
const app = express()
const router = express.Router()

const port = process.env.PORT || 8090

app.use(cors())
app.use(router)
app.use(express.json())


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("/", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../build", "../build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
} else {
  app.get("/", (req, res) => {
    res.json("Server up and running");
  });
}

app.get("/api/v1/info", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/v1/coins", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "100",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Key": "740d6c8fcamsh537b1e793f27e8ep18db1ejsnbf58664a5522",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
  const crypto = await axios(options).then(({ data }) => {
    return data
  })
  res.json({ status: "ok", crypto });
});

app.get("/api/v1/:coinId/:timePeriod", async (req, res) => {
  const { coinId, timePeriod} = req.params
  const options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
    params: { referenceCurrencyUuid: "yhjMzLPhuIDl", timePeriod: `${timePeriod}` },
    headers: {
      "X-RapidAPI-Key": "740d6c8fcamsh537b1e793f27e8ep18db1ejsnbf58664a5522",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
  const coinData = await axios(options).then(({ data }) => {
    return data;
  });
  res.json({ status: "ok", coinData });
});

app.get("/api/v1/history/:coinId/:timePeriod", async (req, res) => {
  const { coinId, timePeriod } = req.params;
  const options = {
    method: "GET",
    url: `https://coinranking1.p.rapidapi.com/coin/${coinId}/history`,
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: `${timePeriod}`,
    },
    headers: {
      "X-RapidAPI-Key": "740d6c8fcamsh537b1e793f27e8ep18db1ejsnbf58664a5522",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };
  const coinData = await axios(options).then(({ data }) => {
    return data;
  });
  res.json({ status: "ok", coinData });
});

app.get("/api/v1/:coin", async (req, res) => {
  const { coin } = req.params
  const options = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: {
      q: `${coin}`,
      setLang: "EN",
      freshness: "Day",
      textFormat: "Raw",
      safeSearch: "Strict",
    },
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "740d6c8fcamsh537b1e793f27e8ep18db1ejsnbf58664a5522",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  };
  const cryptoNews = await axios(options).then(({ data }) => {
    return data;
  });
  const filteredCryptoNews = cryptoNews.value.reduce((acc, rec, index) => {
    const data = {
      name: rec.name,
      url: rec.url,
      newsImg: rec.image,
      description: rec.description,
      company: rec.provider,
      date: rec.datePublished
    };
    return { ...acc, [rec.name]: data }
  }, {})
  res.json({ status: "ok", filteredCryptoNews });
});


app.listen(port, () => {
  console.log(`Server has started on port ${port}`)
})