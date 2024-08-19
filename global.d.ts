type Nullable<T> = T | null;
type Nullish<T> = T | null | undefined;
type Modify<T, K> = Omit<T, keyof K> & K;
type Optional<T> = T | undefined;
type KeyObject<T = string> = { [key: string]: T };
type Tuple<T, K> = [T, K];
type OptionalField<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type StatusMessage<T = any> = {
  message?: string;
  data: Nullable<T>;
  success: boolean;
};

type FileBase64 = {
  name: string;
  content: string;
};
