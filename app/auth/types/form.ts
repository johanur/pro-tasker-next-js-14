interface AuthFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends AuthFormData {
  confirmPassword: string;
}
