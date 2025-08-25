import Post from "@/components/posts/post";
import { postsService } from "@/lib/api/services/postsService";
import { lexicalToString } from "@/lib/helpers/lexicalToString";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ post_slug: string }>;
}) => {
  const { post_slug } = await params;
  const post = await postsService.getPostBySlug(post_slug);
  return {
    title: post?.title || "Gönderi",
    description:
      `${post?.metaDescription} - ${lexicalToString(post?.content)}` ||
      "Gönderi",
  };
};

export default function PostPage() {
  return (
    <div>
      <Post />
    </div>
  );
}
