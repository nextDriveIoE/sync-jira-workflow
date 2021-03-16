const fetch = require('node-fetch');
const core = require('@actions/core');

const jira_url = core.getInput('jira_url');
const jira_user = core.getInput('jira_user');
const jira_token = core.getInput('jira_token');
const jira_status = core.getInput('jira_status');

module.exports = (issue) => {
    const url = `${jira_url}/rest/api/2/issue/${issue}/transitions`
    fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Basic ${Buffer.from(
                `${jira_user}:${jira_token}`
            ).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(res => {
            return res.json();
        })
        .then(res => {
            if (res.errorMessages) {
                console.log(res.errorMessages);
                return
            }
            const status = res.transitions.find((item) => item.to.name === jira_status)
            if (!status) {
                console.log(`${issue} can not find "${jira_status}" status`);
                return;
            }
            const id = status.id
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${Buffer.from(
                        `${jira_user}:${jira_token}`
                    ).toString('base64')}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    transition: { id }
                }),
            })
                .then(res => {
                    if (res.status === 204) {
                        console.log(`${issue} success modify status is "${jira_status}"`);
                    }
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
}
