const fetchJira = require('./src/fetchJira');
const parseJiraIssue = require('./parser/parseJiraIssue');

const github = require('@actions/github');
let title = ""

const pull_request = github.context.payload.pull_request;
if (pull_request) {
    title = pull_request.title;
}

const head_commit = github.context.payload.head_commit;
if (head_commit) {
    title = head_commit.message
}

const issues = parseJiraIssue(title)
if (issues) {
    issues.forEach((issue => fetchJira(issue)))
}


