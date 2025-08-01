export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
