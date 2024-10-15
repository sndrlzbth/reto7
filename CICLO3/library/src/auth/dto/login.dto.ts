import { ApiProperty } from '@nestjs/swagger'
export class LoginDTO {
    @ApiProperty({ example: 'sandra_slem', description: 'El nombre de usuario' })
    username: string;

    @ApiProperty({ example: '123456', description: 'La contraseña del usuario' })
    password: string;
}
