import { IsNotEmpty, IsObject } from 'class-validator';

export class SubmitFormDto {
  @IsObject({ message: 'Dữ liệu gửi lên phải là định dạng JSON Object' })
  @IsNotEmpty({ message: 'Dữ liệu không được để trống' })
  data!: Record<string, any>;
}
