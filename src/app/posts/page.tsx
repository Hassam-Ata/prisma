import { createPost, deletePost } from "@/actions/actions";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const PostsPage = async () => {
  const posts = await prisma.post.findMany({
    where: {
      title: {
        contains: "post",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
    //Used for pagination
    // take:10,
    // skip:2,
  });
  const postsCount = await prisma.post.count();

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24 text-center">
      <h1 className="text-3xl font-semibold">All Posts {postsCount}</h1>

      <ul className="border-t border-b border-white/10 py-5 leading-8">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center justify-between px-5">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <form
        action={createPost}
        className="flex flex-col gap-y-2 w-[300px] text-black"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="px-2 py-1 rounded-sm"
        />
        <textarea
          name="content"
          rows={5}
          placeholder="Content"
          className="px-2 py-1 rounded-sm"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 py-2 text-white rounded-sm"
        >
          Create a post
        </button>
      </form>
    </main>
  );
};

export default PostsPage;
