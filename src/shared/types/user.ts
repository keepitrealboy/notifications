import { Stories } from '@/shared/types/stories';

export enum Sex {
  male = 'male',
  female = 'female',
}

export interface User {
  online: boolean;
  avatar: string;
  name: string;
  username: string;
  sex: Sex;
  verified: boolean;
  stories: Stories | null;
}
