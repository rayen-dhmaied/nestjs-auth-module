import { Injectable } from '@nestjs/common';

export type User = {
    userId : number,
    email : string,
    password : string
}

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            email: "test@gmail.com",
            password: 'password123',
        },
        {
            userId: 2,
            email: 'test2@gmail.com',
            password: 'password2021',
        },
        {
            userId: 3,
            email: 'fafa@gmail.com',
            password: '12345678',
        },
    ];

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
}
