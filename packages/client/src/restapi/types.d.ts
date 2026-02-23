export type RequestResponse<T> = {
  status: number;
  data: T;
};

export type RequestError = {
  status: number;
  data: {
    type: string;
    message: string;
  };
};
