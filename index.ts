import { Github } from './github';

const organization = process.env.ORGANIZATION;
const repo = process.env.REPO;
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const author = process.env.AUTHOR;

const until = new Date().toISOString();
const since = until.replace(/T.*/, 'T00:00:00Z');

const reporter = new Github({ token });

const prefix = (report: string) => {
  return `
  ${report}
  Can you fix the grammer and make it more natural and detail it?
  `;
};
const log = (raw: string, report: string) => {
  console.log(`
Raw report:
${raw}
Formatted report:
${report}
`);
};

const report = await reporter.generateDailyReport({
  organization,
  repo,
  author,
  since,
  until,
});

const gpturl = 'https://api.openai.com/v1/chat/completions';

const params = {
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: prefix(report) }],
  temperature: 0.7,
};
try {
  const data = await fetch(gpturl, {
    verbose: true,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(params),
  });
  const chatCompletion = await data.json();
  const content = chatCompletion.choices[0].message.content;
  log(report, content);
} catch (e) {
  console.log({ e });
}
