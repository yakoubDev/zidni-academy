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
  classes: [string];
}


export interface AuthContextType {
  user: User | null;
  loadingUser: boolean;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}


export type ClassType = {
  title: string;
  description: string;
  price: string;
  level: string;
  icon: string;
};