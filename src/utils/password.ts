/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { hash,compare } from 'bcrypt';

export const createPasswordHashed = async (password: string): Promise<string> => {
  const saltOrRounds = 10;
  return await hash(password, saltOrRounds);
};


export const validatePassword = async (password: string, passwordHashed: string): Promise<boolean>  => {
  return compare(password, passwordHashed);
}