import HistoryItem from '@/models/HistoryItem';
import PaginatedResponse from '@/models/PaginatedResponse';

export default interface IDataService {
  getHistory(keywords: string, offset: number, limit: number): PaginatedResponse<HistoryItem>;
}
