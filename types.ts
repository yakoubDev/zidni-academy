export type LinkType = {
  name: string;
  path: string;
};

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName:string;
  phone: string;
  gender: string;
  role: string;
}


export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}
