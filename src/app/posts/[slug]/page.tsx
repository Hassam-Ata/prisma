import { prisma } from "@/lib/prisma";

const PostPage = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
  });
  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
};

export default PostPage;
