import moment from 'moment';

class DailyReportGenerator {
  constructor(commits) {
    this.commits = commits;
  }

  generate() {
    const commitsByDate = this.commitsByDate();
    return Object.keys(commitsByDate).reduce((toPrint, date) => {
      const dateNow = moment(date).format('LL');
      toPrint += `${dateNow}:\n`;
      const messages = commitsByDate[date];
      messages.forEach((message, index) => {
        const isLast = index === messages.length - 1;
        const regex = /\(#\d+\)/g;
        const result = message.replace(regex, '');
        toPrint += `• ${result}\n`;
        if (isLast) {
          toPrint += '\n';
        }
      });
      return toPrint;
    }, '');
  }

  commitsByDate() {
    return this.commits.reduce((acc, commit) => {
      const date = commit.commit.author.date.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(commit.commit.message);
      return acc;
    }, {});
  }
}

export default DailyReportGenerator;
