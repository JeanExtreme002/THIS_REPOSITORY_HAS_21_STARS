const {repository, owner} = require("./repository");
const fs = require("fs");

function updateReadMeFile(lastStargazerName, lastStargazerImage, lastStargazerLink, stars) {
    const readMeTemplate = fs.readFileSync("./README-Template.md").toString();
    const commitMessage = ":star: " + stars;

    let readMeContent = readMeTemplate.replace(/{stars}/g, stars);
    readMeContent = readMeContent.replace(/{lastStargazerName}/g, lastStargazerName);
    readMeContent = readMeContent.replace(/{lastStargazerImage}/g, lastStargazerImage);
    readMeContent = readMeContent.replace(/{lastStargazerLink}/g, lastStargazerLink);

    repository.writeFile("main", "README.md", readMeContent, commitMessage);
}

function updateRepositoryName(newRepositoryName) {
    repository.updateRepository({name: newRepositoryName});
    console.log("Repository renamed to ->", newRepositoryName);
}

async function main() {
    const repositoryDetails = await repository.getDetails();
    const stargazers_count = repositoryDetails.data.stargazers_count;

    const stargazers = await repository._request('GET', `/repos/${repository.__fullname}/stargazers`, null);
    
    let lastStargazer = stargazers.data[stargazers.data.length - 1];
    lastStargazer = lastStargazer.login == owner ? stargazers.data[stargazers.data.length - 2] : lastStargazer;

    updateReadMeFile(lastStargazer.login, lastStargazer.avatar_url, lastStargazer.html_url, stargazers_count);
    updateRepositoryName("THIS_REPOSITORY_HAS_" + stargazers_count + "_STARS");
}

main();
