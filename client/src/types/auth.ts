export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name?: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: string;
}

export interface UserState {
  user: User | null;
  loadingUser: boolean;
  setUser: (user: User | null) => void;
  setLoadingUser: (loading: boolean) => void;
}
