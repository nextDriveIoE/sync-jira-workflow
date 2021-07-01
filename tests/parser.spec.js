const parseJiraIssueByKeyword = require("../parser/parseJiraIssueByKeyword");
const parseJiraIssue = require("../parser/parseJiraIssue");
const parseJiraIssueByNoSymbol = require("../parser/parseJiraIssueByNoSymbol");

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

test("parseJiraIssueByKeyword", () => {
    expect(parseJiraIssueByKeyword("resolve [EC-123]")).toEqual(["EC-123"])
    expect(parseJiraIssueByKeyword("resolved[EC-123]")).toEqual(["EC-123"])
    expect(parseJiraIssueByKeyword("resolves  [EC-123]")).toEqual(["EC-123"])
    expect(parseJiraIssueByKeyword("fixes [EC-123] fixed [EC-456]")).toEqual(["EC-123", "EC-456"])
    expect(parseJiraIssueByKeyword("fix [EC-123] [EC-456]")).toEqual(["EC-123"])
    expect(parseJiraIssueByKeyword("[EC-123]")).toEqual(null)
    expect(parseJiraIssueByKeyword("fixed /[EC-123]")).toEqual(null)
    expect(parseJiraIssueByKeyword("resolve [GET]")).toEqual(null)
});

test("parseJiraIssue", () => {
    expect(parseJiraIssue("[EC-123]")).toEqual(["EC-123"])
    expect(parseJiraIssue("[GET]")).toEqual(null)
    expect(parseJiraIssue("[EC-123]")).toEqual(["EC-123"])
});

test("parseJiraIssueByNoSymbol", () => {
    expect(parseJiraIssueByNoSymbol("EC-123")).toEqual(["EC-123"])
    expect(parseJiraIssueByNoSymbol("fix-EC-123")).toEqual(["EC-123"])
    expect(parseJiraIssueByNoSymbol("fix-(EC-123)")).toEqual(["EC-123"])
    expect(parseJiraIssueByNoSymbol("fix-EC-123-done")).toEqual(["EC-123"])
    expect(parseJiraIssueByNoSymbol("fixEC-123done")).toEqual(["EC-123"])
    expect(parseJiraIssueByNoSymbol("fix/EC-123,EC-456")).toEqual(["EC-123", "EC-456"])
    expect(parseJiraIssueByNoSymbol("fix/EC-123EC-456/part1")).toEqual(["EC-123", "EC-456"])
    expect(parseJiraIssueByNoSymbol("EC123")).toEqual(null)
    expect(parseJiraIssueByNoSymbol("ec-123")).toEqual(null)
});
