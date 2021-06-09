export default class User {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;

    constructor(firstName: string, lastName: string, email: string, phoneNumber: string, password: string) {
        this.firstName = firstName;
        this.email = email;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}