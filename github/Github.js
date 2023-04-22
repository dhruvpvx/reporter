import DailyReportGenerator from './DailyReportGenerator';
import GitApis from './GitApis';

class Github extends GitApis {
  constructor({ token }) {
    super(token);
  }

  async generateDailyReport(params) {
    return this.getCommits(params).then((commits) => {
      return new DailyReportGenerator(commits.data).generate();
    });
  }
}

export default Github;
