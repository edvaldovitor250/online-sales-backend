/* eslint-disable prettier/prettier */
import { LoginPayload } from "../auth/dtos/loginPayload.dto";

export const authorizationToLoginPayload = (authorization: string): LoginPayload | undefined => {
    const authorizationSplitted = authorization.split('.');

    if (authorizationSplitted.length < 3 || !authorizationSplitted[1]) {
        return undefined;
    }

    const decodedPayload = Buffer.from(authorizationSplitted[1], 'base64').toString('ascii');

        return JSON.parse(decodedPayload) as LoginPayload;
 
};
