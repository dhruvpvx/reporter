import axios from 'axios';

class GitApis {
  constructor(token) {
    this.api = axios.create({
      baseURL: 'https://api.github.com/',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getCommits({ organization, repo, author, since, until }) {
    const url = `repos/${organization}/${repo}/commits`;
    const config = { params: { since, until, author } };
    return this.api.get(url, config);
  }

  getOrgs() {
    return this.api.get('user/orgs');
  }

  getRepos({ organization }) {
    return this.api.get(`orgs/${organization}/repos`);
  }
}

export default GitApis;
