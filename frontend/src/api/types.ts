export type ResponseData<T extends {} = {}> = T & {
  status: number;
};
