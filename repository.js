const GitHub = require("github-api");

const dotenv = require("dotenv");
dotenv.config();

const githubToken = process.env.TOKEN;
const [owner, repositoryName] = process.env.REPOSITORY.split("/");

const github = new GitHub({token: githubToken});
const repository = github.getRepo(owner, repositoryName);

module.exports = {repository: repository, owner: owner};
