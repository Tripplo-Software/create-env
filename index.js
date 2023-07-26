const core = require('@actions/core');
const fs = require('fs');
const os = require('os');

async function run() {
    try {

        const envs = core.getMultilineInput('env', { trimWhitespace: true, required: true });
        let envList = ''
        envs.forEach(env => {
            const keyValues = env.split(':');
            const value =keyValues.splice(1, keyValues.length -1).join(':');
            envList += `${keyValues[0].trim()}=${value.trim()} `;
            fs.writeFileSync('./.env', `${keyValues[0].trim()}=${value.trim()}${os.EOL}`, { flag: 'a' })
        })
        core.setOutput('envs', envList);
        core.setOutput('status', 'success');
        
    } catch (error) {
        core.debug(error.message);
        core.setFailed(error.message);
        core.setOutput('status', 'failed');
    }
}
run();
