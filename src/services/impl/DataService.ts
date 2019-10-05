import PaginatedResponse from '@/models/PaginatedResponse';
import HistoryItem from './../../models/HistoryItem';
import { injectable } from 'inversify-props';
import IDataService from '../IDataService';

@injectable()
export default class DataService implements IDataService {

  private history: HistoryItem[] = [
    {
      revision: 3,
      revisionTimestamp: "2019-09-23T18:25:43.511Z",
      author: "Johannes Lichtenberger",
      commitMessage: "Insert a JSON object"
    },
    {
      revision: 2,
      revisionTimestamp: "2019-09-21T15:22:41.121Z",
      author: "Marc Kramis",
      commitMessage: "Remove JSON object record"
    },
    {
      revision: 1,
      revisionTimestamp: "2019-09-19T12:12:43.111Z",
      author: "Marc Kramis",
      commitMessage: "Initial commit"
    },
    {
      revision: 3,
      revisionTimestamp: "2019-09-23T18:25:43.511Z",
      author: "Johannes Lichtenberger",
      commitMessage: "Insert a JSON object"
    },
    {
      revision: 2,
      revisionTimestamp: "2019-09-21T15:22:41.121Z",
      author: "Marc Kramis",
      commitMessage: "Remove JSON object record"
    },
    {
      revision: 1,
      revisionTimestamp: "2019-09-19T12:12:43.111Z",
      author: "Marc Kramis",
      commitMessage: "Initial commit"
    },
    {
      revision: 3,
      revisionTimestamp: "2019-09-23T18:25:43.511Z",
      author: "Johannes Lichtenberger",
      commitMessage: "Insert a JSON object"
    },
    {
      revision: 2,
      revisionTimestamp: "2019-09-21T15:22:41.121Z",
      author: "Marc Kramis",
      commitMessage: "Remove JSON object record"
    },
    {
      revision: 1,
      revisionTimestamp: "2019-09-19T12:12:43.111Z",
      author: "Marc Kramis",
      commitMessage: "Initial commit"
    },
    {
      revision: 3,
      revisionTimestamp: "2019-09-23T18:25:43.511Z",
      author: "Johannes Lichtenberger",
      commitMessage: "Insert a JSON object"
    },
    {
      revision: 2,
      revisionTimestamp: "2019-09-21T15:22:41.121Z",
      author: "Marc Kramis",
      commitMessage: "Remove JSON object record"
    },
    {
      revision: 1,
      revisionTimestamp: "2019-09-19T12:12:43.111Z",
      author: "Marc Kramis",
      commitMessage: "Initial commit"
    },
    {
      revision: 3,
      revisionTimestamp: "2019-09-23T18:25:43.511Z",
      author: "Johannes Lichtenberger",
      commitMessage: "Insert a JSON object"
    },
    {
      revision: 2,
      revisionTimestamp: "2019-09-21T15:22:41.121Z",
      author: "Marc Kramis",
      commitMessage: "Remove JSON object record"
    },
    {
      revision: 1,
      revisionTimestamp: "2019-09-19T12:12:43.111Z",
      author: "Marc Kramis",
      commitMessage: "Initial commit"
    },
    {
      revision: 3,
      revisionTimestamp: "2019-09-23T18:25:43.511Z",
      author: "Johannes Lichtenberger",
      commitMessage: "Insert a JSON object"
    },
    {
      revision: 2,
      revisionTimestamp: "2019-09-21T15:22:41.121Z",
      author: "Marc Kramis",
      commitMessage: "Remove JSON object record"
    },
    {
      revision: 1,
      revisionTimestamp: "2019-09-19T12:12:43.111Z",
      author: "Marc Kramis",
      commitMessage: "Initial commit"
    },
  ];

  public getHistory(keywords: string, offset: number, limit: number): PaginatedResponse<HistoryItem> {
    let data: HistoryItem[] = [];
    const filterrecoder = this.history.filter((item: HistoryItem) => {
      return (
        !keywords ||
        item.commitMessage.toLowerCase().includes(keywords.toLowerCase())
      );
    });

    const total = filterrecoder.length;
    if (total >= 0) {
      data = filterrecoder.slice(offset, limit + offset);
    }
    return {
      data,
      total
    };
  }
}
