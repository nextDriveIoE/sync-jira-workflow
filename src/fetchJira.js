const fetch = require('node-fetch');
const core = require('@actions/core');

const jira_url = core.getInput('jira_url');
const jira_user = core.getInput('jira_user');
const jira_token = core.getInput('jira_token');

function getCurrentStatus(issue) {
    return fetch(`${jira_url}/rest/api/2/issue/${issue}?fields=status`, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${Buffer.from(`${jira_user}:${jira_token}`).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .catch(err => core.setFailed(err));
}

function getIssueTransitions(issue) {
    return fetch(`${jira_url}/rest/api/2/issue/${issue}/transitions`, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${Buffer.from(`${jira_user}:${jira_token}`).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json())
        .catch(err => core.setFailed(err));
}

function updateIssueTransitions(issue, id) {
    return fetch(`${jira_url}/rest/api/2/issue/${issue}/transitions`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${jira_user}:${jira_token}`).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            transition: { id }
        })
    })
        .catch(err => core.setFailed(err));
}

async function fetchJira(issue, jira_status, jira_status_transition) {
    console.info("issue", issue);
    console.info("jira_status", jira_status);
    console.info("jira_status_transition", jira_status_transition);
    const currentStatusResponse = await getCurrentStatus(issue);
    if (currentStatusResponse.errorMessages) {
        core.setFailed(`errorMessages:${currentStatusResponse.errorMessages}, issue:${issue}, jira_status:${jira_status}`);
        return;
    }

    const currentStatus = currentStatusResponse.fields.status.name;
    if (currentStatus.toLowerCase() === jira_status.toLowerCase()) {
        console.log(`${issue} already is "${jira_status}"`);
        return;
    }

    const getTransitionsResponse = await getIssueTransitions(issue);
    let recall = false;
    let toStatus = getTransitionsResponse.transitions.find((item) => item.to.name && (item.to.name.toLowerCase() === jira_status.toLowerCase()));

    if (!toStatus) {
        if (jira_status_transition) {
            toStatus = getTransitionsResponse.transitions.find((item) => item.to.name && (item.to.name.toLowerCase() === jira_status_transition.toLowerCase()));
            recall = true
        } else {
            core.setFailed(`${issue} can not find "${jira_status}" status`);
            return;
        }
    }
    console.info("toStatus", toStatus);
    const updateTransitionsResponse = await updateIssueTransitions(issue, toStatus.id);
    if (updateTransitionsResponse.status === 204) {
        console.log(`${issue} success modify status is "${toStatus.to.name}"`);
        if (recall) {
            await fetchJira(issue, jira_status)
        }
    }
}

module.exports = fetchJira;
