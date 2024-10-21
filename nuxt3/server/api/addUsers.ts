import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

  const body = await readBody(event);

  const { name, password, role } = body;

  if (password.length < 8){
    return { error: "Senha deve ser maior que 8 charactéres" };
  }

  const existingUser = await prisma.user.findFirst({
    where: { name },
  });

  if (existingUser) {
    return { error: "Usuário já existente" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        role: role || 'user', 
      },
    });

    return { success: true, userId: newUser.id };

  } catch (error) {
    console.error("Erro ao inserir usuário:", error);
    return { error: "Erro ao inserir valores" };
  }
});
