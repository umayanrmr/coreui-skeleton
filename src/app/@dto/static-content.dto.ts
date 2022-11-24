export interface StaticContent<T> {
  ver: string;
  expiry: number;
  value: T;
}