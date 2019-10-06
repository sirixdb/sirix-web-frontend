export default interface PaginatedResponse<T> {
  data: T[];
  total: number;
}
