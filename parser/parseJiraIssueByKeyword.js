const parseJiraIssueByKeyword = (content) => {
    const regex = /(?<=((close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)\s*\[))([A-Z]+-[0-9]+)(?=(\]))/g;
    return content.match(regex);
}

module.exports = parseJiraIssueByKeyword;
