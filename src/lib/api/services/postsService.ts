import { ApiClient } from "../useApi";
import { GetPostsParams, PostLikeResponse, PostsResponse, WebsitePost } from "../../types/posts";

// Server-side website service using ApiClient
export class PostsService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient();
  }

  async getPosts(params?: GetPostsParams): Promise<PostsResponse> {
    try {
      const response = await this.api.get<PostsResponse>(
        `/website/${process.env.NEXT_PUBLIC_WEBSITE_ID}/posts`,
        { params }
      );

      return response.data;
    } catch (error) {
      console.error("Error getting posts:", error);
      throw error;
    }
  }

  async getPostBySlug(slug: string): Promise<WebsitePost | null> {
    try {
      const response = await this.api.get<{ data: WebsitePost }>(
        `/website/${process.env.NEXT_PUBLIC_WEBSITE_ID}/posts/${slug}`,
      );

      return response.data.data;
    } catch (error) {
      console.error("Error getting post by slug:", error);
      throw error;
    }
  }

  async likePost(postId: string): Promise<PostLikeResponse> {
    try {
      const response = await this.api.post<PostLikeResponse>(
        `/website/${process.env.NEXT_PUBLIC_WEBSITE_ID}/posts/${postId}/like`
      );
      return response.data;
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
  }

  async unlikePost(postId: string): Promise<PostLikeResponse> {
    try {
      const response = await this.api.delete<PostLikeResponse>(
        `/website/${process.env.NEXT_PUBLIC_WEBSITE_ID}/posts/${postId}/like`
      );
      return response.data;
    } catch (error) {
      console.error("Error unliking post:", error);
      throw error;
    }
  }
}

// Create a default instance for server-side usage
export const postsService = new PostsService();

// For backward compatibility, export the function-based approach
export const serverPostsService = () => {
  const service = new PostsService();

  return {
    getPosts: service.getPosts.bind(service),
    getPostBySlug: service.getPostBySlug.bind(service),
  };
};
