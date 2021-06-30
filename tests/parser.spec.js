const parseJiraIssueByKeyword = require('../parser/parseJiraIssueByKeyword');
const parseJiraIssue = require('../parser/parseJiraIssue');

test("getJiraIssueByKeyword", () => {
    expect(parseJiraIssueByKeyword("resolve [EC-123]")).toEqual(["EC-123"])
    expect(parseJiraIssueByKeyword("resolved[EC-123]")).toEqual(["EC-123"])
    expect(parseJiraIssueByKeyword("resolves  [EC-123]")).toEqual(["EC-123"])
    expect(parseJiraIssueByKeyword("fix [EC-123] [EC-456]")).toEqual(["EC-123"])
    expect(parseJiraIssueByKeyword("fixes [EC-123] fixed [EC-456]")).toEqual(["EC-123", "EC-456"])
    expect(parseJiraIssueByKeyword("[EC-123]")).toEqual(null)
    expect(parseJiraIssueByKeyword("fixed /[EC-123]")).toEqual(null)
    expect(parseJiraIssueByKeyword("resolve [GET]")).toEqual(null)
});

test("parseJiraIssue", () => {
    expect(parseJiraIssue("[EC-123]")).toEqual(["EC-123"])
    expect(parseJiraIssue("[GET]")).toEqual(null)
});
