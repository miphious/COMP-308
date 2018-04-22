export class User {
    id: string;
    firstName: String;
    lastName: String;
    email: String;
    address: String;
    role: String;
    password?: String;
    courses?: string[]; // ToDo remove
}
