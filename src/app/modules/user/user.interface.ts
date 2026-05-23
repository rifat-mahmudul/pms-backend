export type TUserRole = "ADMIN" | "MANAGER" | "MEMBER";

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: TUserRole;
  department?: string;
  skills?: string[];
  avatar?: string;
  isDeleted?: boolean;
}
