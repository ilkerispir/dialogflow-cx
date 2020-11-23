const project = require('./global-veriables.json');

const projectId = project.projectId;
const location = project.location;
const agentId = project.agentId;

async function main(projectId, location, agentId) {
  const {IntentsClient} = require('@google-cloud/dialogflow-cx');
  const client = new IntentsClient();

  async function listIntents() {
    const parent = client.agentPath(projectId, location, agentId);
    console.info(parent);

    const [intents] = await client.listIntents({
      parent,
      pageSize: 100,
    });
    intents.forEach(intent => {
      console.log('====================');
      console.log(`Intent name: ${intent.name}`);
      console.log(`Intent display name: ${intent.displayName}`);
      console.log(`# Parameters: ${intent.parameters.length}`);
      console.log(`# Training Phrases: ${intent.trainingPhrases.length}`);
    });
  }

  listIntents();
  // [END dialogflow_cx_list_intents]
}

main(projectId, location, agentId);
process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});