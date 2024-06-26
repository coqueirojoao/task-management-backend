export default interface IUser {
  id: number;
  name: string;
  email: string;
  role: string[];
  password: string;
  created_at: Date;
  updated_at: Date;
}
