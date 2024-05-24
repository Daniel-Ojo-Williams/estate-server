import type { Request, Response } from "express";
import { IPostService } from '../types';
import { HttpCode } from "../constants";
import { PostInput, PostQuery } from "./post.validator";
import CustomError from "../helpers/customError";
import { PostDetails } from "@prisma/client";

class PostController {
  constructor(private readonly PostService: IPostService){}

  async createPost(req: Request<{}, {}, PostInput>, res: Response) {
    try {
      const { id: userId } = res.locals.user;
      const { postData, postDetails } = req.body;
      

      const post = await this.PostService.createPost(userId, postData, postDetails as PostDetails);

      return res.status(HttpCode.CREATED).json({ error: false, message: 'Post created successfully', data: post });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ error: true, message: error.message });
      }
    }
  }

  async getSinglePost(req: Request<{id: string}>, res: Response) {
    try {
      const { id } = req.params;

      const Post = await this.PostService.getSinglePost(id);

      if (!Post) return res.status(HttpCode.NOT_FOUND).json({ error: true, message: 'Post with the provided id not found' });

      return res.status(HttpCode.OK).json({ error: false, message: 'Fetched post successfully', data: Post });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ error: true, message: error.message });
      }
    }
  }

  async getAllPosts(req: Request<{}, {}, {}, PostQuery>, res: Response) {
    try {
      
      const { bedroom, city, minPrice, maxPrice, property, type } = req.query;
      const query: PostQuery = {};
      if (bedroom) query.bedroom = bedroom;
      if (minPrice) query.minPrice = minPrice;
      if (maxPrice) query.maxPrice = maxPrice;
      if (city) query.city = city;
      if (property) query.property = property;
      if (type) query.type = type;

      const Posts = await this.PostService.getAllPosts(query);

      return res.status(HttpCode.OK).json({ error: false, message: 'Fetched all posts', data: Posts });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ error: true, message: error.message });
      }
    }
  }

  async updatePost(req: Request<{id: string}, {}, PostInput>, res: Response) {
    try {
      const { id: postId } = req.params;
      const { id: userId } = res.locals.user;
      const { postData } = req.body;
      const post = await this.PostService.updatePost(postId, userId, postData);

      if (!post) return res.status(HttpCode.NOT_FOUND).json({ error: true, message: 'Post with id not found' });

      return res.status(HttpCode.OK).json({ error: false, message: 'Updated post successfully', data: post });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ error: true, message: error.message });
      } else if (error instanceof CustomError) {
        res
          .status(error.status_code)
          .json({ error: true, message: error.message });
      }
    }
  }

  async deletePost(req: Request<{id: string}>, res: Response) {
    try {
      const { id: postId } = req.params;
      const { id: userId } = res.locals.user;
      const post = await this.PostService.deletePost(postId, userId);
      if (!post) return res.status(HttpCode.NOT_FOUND).json({ error: true, message: 'Post with id not found' });
      return res.status(HttpCode.OK).json({ error: false, message: 'Deleted post successfully' });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(HttpCode.INTERNAL_SERVER_ERROR)
          .json({ error: true, message: error.message });
      } else if (error instanceof CustomError) {
        res
          .status(error.status_code)
          .json({ error: true, message: error.message });
      }
    }
  }
}

export default PostController;