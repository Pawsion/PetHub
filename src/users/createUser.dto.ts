export class CreateUserDto {
    full_name: string;
    email: string;
    phone_number: string;
    password_hash: string;
    profile_picture?: string;
    
  }