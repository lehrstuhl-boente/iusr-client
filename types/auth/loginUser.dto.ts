export interface LoginUserDto {
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
}