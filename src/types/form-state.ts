export type FormActionState<T> = {
  data?: T;
  state?: 'idle' | 'loading' | 'error' | 'success';
  message?: string;
};
