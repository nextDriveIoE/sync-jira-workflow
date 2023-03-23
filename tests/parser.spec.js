const parseJiraIssueByKeyword = require("../parser/parseJiraIssueByKeyword");
const parseJiraIssue = require("../parser/parseJiraIssue");


describe("parseJiraIssueByKeyword", () => {
    test("[EC-<numbers>]", () => {
        expect(parseJiraIssueByKeyword("resolve [EC-123]")).toEqual(["EC-123"]);
        expect(parseJiraIssueByKeyword("resolved[EC-123]")).toEqual(["EC-123"]);
        expect(parseJiraIssueByKeyword("resolves  [EC-123]")).toEqual(["EC-123"]);
        expect(parseJiraIssueByKeyword("fix [EC-123] [EC-456]")).toEqual(["EC-123"]);
        expect(parseJiraIssueByKeyword("fixes [EC-123] fixed [EC-456]")).toEqual(["EC-123", "EC-456"]);
        expect(parseJiraIssueByKeyword("[EC-123]")).toEqual(null);
        expect(parseJiraIssueByKeyword("fixed /[EC-123]")).toEqual(null);
        expect(parseJiraIssueByKeyword("resolve [GET]")).toEqual(null);
    });

    test("[IOEP-<numbers>]", () => {
        expect(parseJiraIssueByKeyword("resolve [IOEP-123]")).toEqual(["IOEP-123"]);
        expect(parseJiraIssueByKeyword("resolved[IOEP-123]")).toEqual(["IOEP-123"]);
        expect(parseJiraIssueByKeyword("resolves  [IOEP-123]")).toEqual(["IOEP-123"]);
        expect(parseJiraIssueByKeyword("fix [IOEP-123] [IOEP-456]")).toEqual(["IOEP-123"]);
        expect(parseJiraIssueByKeyword("fixes [IOEP-123] fixed [IOEP-456]")).toEqual(["IOEP-123", "IOEP-456"]);
        expect(parseJiraIssueByKeyword("[IOEP-123]")).toEqual(null);
        expect(parseJiraIssueByKeyword("fixed /[IOEP-123]")).toEqual(null);
    });
});


describe("parseJiraIssue", () => {

    test("[EC-<numbers>]", () => {
        expect(parseJiraIssue("[EC-123]")).toEqual(["EC-123"]);
    });

    test("[IOEP-<numbers>]", () => {
        expect(parseJiraIssue("[IOEP-123]")).toEqual(["IOEP-123"]);
        expect(parseJiraIssue("[IOEP-3333]")).toEqual(["IOEP-3333"]);
        expect(parseJiraIssue("[IOEP-1] [IOEP-2]")).toEqual(["IOEP-1", "IOEP-2"]);
        expect(parseJiraIssue("resolve [IOEP-1], resolve[IOEP-2]")).toEqual(["IOEP-1", "IOEP-2"]);
        expect(parseJiraIssue("resolve [IOEP-1] resolve[IOEP-2]")).toEqual(["IOEP-1", "IOEP-2"]);
    });

    test("Should be null", () => {
        expect(parseJiraIssue("[GET]")).toEqual(null);
    });
});
