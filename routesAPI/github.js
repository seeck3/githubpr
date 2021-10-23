const express = require("express");
const axios = require("axios");
const router = express.Router();
const getAll = require("../utils/utils");

router.get("/prs", async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      url: `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
    });
    const { data } = response;
    const allPRs = await Promise.all(data.map((repo) => getAll(repo.name)));

    let prCount = 0;
    allPRs.forEach((pr) => (prCount += pr));

    res.send("Total PRs are : " + prCount + " PRs");
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
