interface AuthFormData {
  email: string;
  password: string;
}
export interface LoginFormData extends AuthFormData {}

export interface RegisterFormData extends AuthFormData {
  confirmPassword: string;
}
