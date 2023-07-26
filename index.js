const core = require('@actions/core');
const fs = require('fs');

async function run() {
    try {

        const envs = core.getMultilineInput('envs', { trimWhitespace: true, required: true });
        envs.forEach(env => {
            const keyValues = env.split(':')
            const value =keyValues.splice(1, keyValues.length -1).join(':')
            fs.writeFileSync('.env', `${keyValues[0].trim()}=${value.trim()}\n`, { flag: 'a' })
        })
        core.setOutput('status', 'success');
    } catch (error) {
        core.debug(error.message);
        core.setFailed(error.message);
        core.setOutput('status', 'failed');
    }
}
run();
