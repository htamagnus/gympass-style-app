import { prisma } from "@/lib/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}
export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithEmailAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userWithEmailAlreadyExists) {
        throw new Error("User with this email already exists")
    }

    await this.usersRepository.create({
        name,
        email,
        password_hash
    })
}
}