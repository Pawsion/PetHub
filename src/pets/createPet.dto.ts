export class CreatePetDto {
    user_id: number;
    name: string;
    breed?: string;
    age?: number;
    weight?: number;
    medical_notes?: string;
  }
  