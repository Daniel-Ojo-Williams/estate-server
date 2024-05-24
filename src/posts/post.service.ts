import { IPostService } from "../types";
import { prisma } from '../config/client';
import { PostInput, PostQuery } from "./post.validator";
import CustomError from "../helpers/customError";
import { HttpCode } from "../constants";
import { PostDetails, Property, Type } from "@prisma/client";

class PostService implements IPostService {
  async getAllPosts(query?: PostQuery) {
    const Posts = await prisma.post.findMany({
      include: {
        postDetails: true,
      },
      where: {
        city: query?.city,
        bedroom: query?.bedroom,
        property: Property[query?.property as keyof typeof Property] || undefined,
        type: Type[query?.type as keyof typeof Type],
        price: {
          gte: query?.minPrice || 0,
          lte: query?.maxPrice || 1000000
        }
      },
    });
    return Posts;
  }

  async getSinglePost(id: string) {
    const post = await prisma.post.findUnique({
      where: { id }, include: {
        postDetails: true,
        user: true
      }
    });

    return post;
  }

  async createPost(
    userId: string,
    postData: PostInput["postData"],
    postDetails: PostDetails
  ) {
    const post = await prisma.post.create({
      data: {
        userId,
        ...postData,
        postDetails: {
          create: postDetails
        }
      },
      include: {
        postDetails: true
      }
    });

    return post;
  }

  async updatePost(
    id: string,
    userId: string,
    postData: Partial<PostInput["postData"]>
  ) {
    const user = await prisma.post.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (user && user.userId !== userId)
      throw new CustomError(
        HttpCode.FORBIDDEN,
        "You can only update posts you created"
      );

    const updatedPost = await prisma.post.update({
      where: { id },
      data: postData,
      include: {
        postDetails: true
      }
    });

    return updatedPost;
  }

  async deletePost(id: string, userId: string) {
    const user = await prisma.post.findUnique({
      where: { id },
      select: {
        userId: true,
      },
    });

    if (user && user.userId !== userId)
      throw new CustomError(
        HttpCode.FORBIDDEN,
        "You can only update posts you created"
      );

    const post = await prisma.post.delete({ where: { id } });

    return post;
  }
}

export default new PostService();