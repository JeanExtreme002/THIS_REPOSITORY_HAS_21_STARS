const repository = require("./repository");

repository.getDetails().then((details) => {
	const stars = details.data.stargazers_count;
	const newRepositoryName = $`THIS_REPOSITORY_HAS_${stars}_STARS`;
	repository.updateRepository({name: newRepositoryName});
});
