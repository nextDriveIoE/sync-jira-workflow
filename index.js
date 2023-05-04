const fetchJira = require('./src/fetchJira');
const parseJiraIssue = require('./parser/parseJiraIssue');
const parseJiraIssueByKeyword = require('./parser/parseJiraIssueByKeyword');
const parseJiraIssueByNoSymbol = require('./parser/parseJiraIssueByNoSymbol');
const github = require('@actions/github');
const core = require('@actions/core');
const jira_status_flow = core.getInput('jira_status_flow');
const flow = JSON.parse(jira_status_flow);

// pr_merged
if (github.context.payload.head_commit && flow["pr_merged"]) {
    const title = github.context.payload.head_commit.message;
    const issues = parseJiraIssue(title);
    if (issues) {
        const keywordIssue = parseJiraIssueByKeyword(title);

        if (keywordIssue) {
            keywordIssue.forEach((issue => fetchJira(issue.trim(), flow["pr_merged"])));
        }

        if (flow["new_branch"]) {
            issues
                .filter((i) => !keywordIssue || !keywordIssue.includes(i))
                .forEach((issue => fetchJira(issue.trim(), flow["new_branch"])));
        }
    } else {
        console.log("No Any Issue Need To Change");
    }
}

// pull_request
if (github.context.payload.pull_request && flow["pull_request"]) {
    const title = github.context.payload.pull_request.title;
    const issues = parseJiraIssue(title);
    if (issues) {
        issues.forEach((issue => fetchJira(issue.trim(), flow["pull_request"], flow["new_branch"])));
    } else {
        console.log("No Any Issue Need To Change");
    }
}

// new_branch
if (github.context.payload.ref_type && flow["new_branch"]) {
    const title = github.context.payload.ref;
    const issues = parseJiraIssueByNoSymbol(title);
    if (issues) {
        issues.forEach((issue => fetchJira(issue.trim(), flow["new_branch"])));
    } else {
        console.log("No Any Issue Need To Change");
    }
}
