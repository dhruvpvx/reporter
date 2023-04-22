import { Github } from './github';

const organization = process.env.ORGANIZATION;
const repo = process.env.REPO;
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const author = process.env.AUTHOR;

const until = new Date().toISOString();
const since = until.replace(/T.*/, 'T00:00:00Z');

const reporter = new Github({ token });

reporter
  .generateDailyReport({
    organization,
    repo,
    author,
    since,
    until,
  })
  .then((report) => {
    console.log(report);
  })
  .catch((error) => {
    console.log(error);
  });
