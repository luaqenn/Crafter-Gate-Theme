import { ApiClient } from "../useApi";
import { GetPostsParams, PostsResponse } from "../../types/posts";

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
}

// Create a default instance for server-side usage
export const postsService = new PostsService();

// For backward compatibility, export the function-based approach
export const serverPostsService = () => {
  const service = new PostsService();

  return {
    getPosts: service.getPosts.bind(service),
  };
};
