interface Transaction {
  description: string;
  id: string;
  size: number;
  time: string;
  username: string;
}

export interface GetTransactionsResponse extends Array<Transaction> {}

export interface RevertTransactionsResponse {
  message: string;
}
