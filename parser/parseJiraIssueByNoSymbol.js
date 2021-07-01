const parseJiraIssueByNoSymbol = (content) => {
    const regex = /(?<=.?)([A-Z]+-[0-9]+)(?=.?)/g;
    return content.match(regex);
}

module.exports = parseJiraIssueByNoSymbol;
