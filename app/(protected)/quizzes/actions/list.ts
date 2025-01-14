import type { Quizzes, User } from "@prisma/client";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export async function list(): Promise<Quizzes[]> {
  const data = await db.quizzes.findMany({
    include: {
      quizzesSection: true,
    },
  });

  return data;
}

export async function fetchById(
  id: string,
  sectionId: string,
  userId: string
): Promise<Quizzes | null> {
  const questions = await db.quizzes.findFirst({
    where: {
      id,
    },
    include: {
      quizzesSection: {
        where: { id: sectionId },
        include: {
          userTag: {
            where: {
              userId: userId,
            },
          },
          quizResult: {
            where: {
              userId: userId,
            },
            include: {
              userAnswerOptions: true,
            },
          },
          questions: {
            include: {
              questionOptions: {
                include: {
                  answers: true,
                  answerOptions: true,
                  userAnswerOptions: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!questions) {
    notFound();
  }

  return questions;
}
export async function fetchByIdQ(id: string): Promise<Quizzes | null> {
  const questions = await db.quizzes.findFirst({
    where: {
      id,
    },
    include: {
      quizzesSection: {
        include: {
          questions: true,
          quizResult: true,
        },
      },
    },
  });

  if (!questions) {
    notFound();
  }

  return questions;
}
