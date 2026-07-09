export interface AppUser {
  sub: string;
  email: string;
  role: UserType;
}

export enum UserType {
  USER,
}
