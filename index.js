const fetchJira = require('./src/fetchJira');
const parseJiraIssue = require('./parser/parseJiraIssue');
const github = require('@actions/github');
const core = require('@actions/core');

const action_status = core.getInput('action_status');
let issues

if (action_status === "new_branch") {
    title = github.context.payload.ref;
    issues = title.split("issue/")[1].split(",")
    console.log(issues);
}

if (action_status === "pull_request") {
    title = github.context.payload.pull_request.title;
    issues = parseJiraIssue(title)
}

if (action_status === "pr_merged") {
    title = github.context.payload.head_commit.message;
    issues = parseJiraIssue(title)
}

if (issues) {
    issues.forEach((issue => fetchJira(issue.trim())))
}


