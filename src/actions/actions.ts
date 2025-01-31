"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createPost = async (formData: FormData) => {
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });

  revalidatePath("/posts");
};

export const editPost = async (formData: FormData, slug: string) => {
  await prisma.post.update({
    where: { slug },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });
};
export const deletePost = async (formData: FormData, slug: string) => {
  await prisma.post.delete({
    where: { slug },
  });
};
