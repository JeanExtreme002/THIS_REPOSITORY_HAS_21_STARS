const GitHub = require("github-api");

const dotenv = require("dotenv");
dotenv.config();

const github = new GitHub({token: process.env.TOKEN});
const repository = github.getRepo(...process.env.REPOSITORY.split("/"));

module.exports = repository;
