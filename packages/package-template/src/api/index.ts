import Api from '@/constant/request';

export interface User {
  id: number;
  email: string;
  displayName: string;
  permissions: string[];
}

export async function getUser(): Promise<User> {
  const resp = await Api.get<User>('user');
  return resp.data;
}
