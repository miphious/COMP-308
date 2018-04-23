import { User } from './user';

export class Patient extends User {
    nurses?: User[];
}
