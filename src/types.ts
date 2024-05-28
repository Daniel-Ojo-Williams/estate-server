import { UserInput } from "./users/user.validator";
import { type User, type Post, Prisma, PostDetails, SavedPosts } from "@prisma/client";
import type { PostInput, PostQuery } from "./posts/post.validator";

export interface IUserService {
  addUser: (user: UserInput) => Promise<void>;
  findUserByEmail: (email: string) => Promise<User | null>;
  findUserById: (id: string) => Promise<User | null>;
  findUserByUsername: (username: string) => Promise<User | null>;
  updateUserProfile: (id: string, data: Partial<User>) => Promise<User | null>;
}

export interface IPostService {
  getAllPosts: (query?: PostQuery) => Promise<Post[]>;
  getSinglePost: (id: string, userId?: string) => Promise<Post & { isSaved: boolean } | null>;
  createPost: (
    userId: string,
    postData: PostInput["postData"],
    postDetails: PostDetails
  ) => Promise<Post>;
  savePost: (postId: string, userId: string) => Promise<boolean>;
  profilePosts: (userId: string) => Promise<{ myPosts: Array<Post>; savedPosts: Array<Post> }>; 
  updatePost: (
    postId: string,
    userId: string,
    postData: PostInput["postData"]
  ) => Promise<Post>;
  deletePost: (postId: string, userId: string) => Promise<Post>;
}

declare global {
  namespace Express {
    interface Locals {
      user: { id: string };
    }
  }
}
