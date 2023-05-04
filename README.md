# nextDriveIoE/sync-jira-workflow@3.0.0

## How to use
```
name: Sync Jira Issue

on:
  create:
  pull_request:
    types:
      - opened
      - reopened
      - edited
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: "Modify Jira Issue Status"
        uses: nextDriveIoE/sync-jira-workflow@2.0.0
        with:
          jira_url: JIRA_URL
          jira_user: JIRA_USER
          jira_token: JIRA_TOKEN
          jira_status_flow: '{"new_branch":"JIRA_STATUS_1","pull_request":"JIRA_STATUS_2","pr_merged":"JIRA_STATUS_3"}'
```

## How to work on flow
```
> new_branch
status -> JIRA_STATUS_1

> pull_request
status -> JIRA_STATUS_2
status -> JIRA_STATUS_1 -> JIRA_STATUS_2 (fool-proof)

> pr_merged
status -> JIRA_STATUS_3 (has keyword)
status -> JIRA_STATUS_1 (has no keyword)
```

### keyword in PR title
- close
- closes
- closed
- fix
- fixes
- fixed
- resolve
- resolves
- resolved

## Example
### Create new remote branch
- fix/AB-123
- fix/AB-123,AB-456

### Create pull request
- fix: resolve [AB-123] xxxxx
