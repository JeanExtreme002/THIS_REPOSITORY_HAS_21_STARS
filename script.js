const repository = require("./repository");
const fs = require("fs");

function updateRepositoryName(newRepositoryName) {
	repository.updateRepository({name: newRepositoryName});
    console.log("Repository renamed to ->", newRepositoryName);
}

function updateReadMeFile(stars) {
	const readMeTemplate = fs.readFileSync("./README-Template.md").toString();
	const readMeContent = readMeTemplate.replaceAll("{stars}", stars);
	const commitMessage = ":star: " + stars;
	repository.writeFile("main", "README.md", readMeContent, commitMessage);
}

repository.getDetails().then((details) => {
	updateReadMeFile(details.data.stargazers_count);
    updateRepositoryName("THIS_REPOSITORY_HAS_" + details.data.stargazers_count + "_STARS");
});
