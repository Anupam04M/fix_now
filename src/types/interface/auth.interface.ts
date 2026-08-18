import { USER_ROLE } from "../enum/enum";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword?: string;
  terms?: boolean;
}

// Matches the exact API response for a User
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  status: string;
  avatar: string | null;
}

export interface AuthState {
  user: User | null;
  role: string | null;
  isAuthenticate: boolean;
  isLoading: boolean;
  isError: string | null;
  drawer: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  loginUser: (payload: LoginPayload) => Promise<any>;
  // We'll pass the role (customer or provider) to route to the correct endpoint
  signupUser: (
    payload: SignupPayload,
    endpointRole: "customer" | "provider",
  ) => Promise<any>;
  logout: () => Promise<boolean>;
}
