const axios = require("axios");
const getAll = async (repo) => {
  let prs = 0;
  let currentPage = 1;
  let lastPage = false;

  while (!lastPage) {
    let response = await axios({
      method: "get",
      url: `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repo}/pulls?state=all&per_page=100&page=${currentPage}`,
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json", // MUST ADD TO INCLUDE TOPICS
      },
    });

    prs += response.data.length;
    currentPage++;
    if (response.data.length < 100) {
      lastPage = true;
    }
  }

  return prs;
};

module.exports = getAll;
