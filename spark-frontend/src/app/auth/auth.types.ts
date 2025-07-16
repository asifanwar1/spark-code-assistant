export interface ISignupFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
    newsletter: boolean;
}

export interface ISigninFormData {
    email: string;
    password: string;
}
