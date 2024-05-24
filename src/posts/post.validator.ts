import { z } from "zod";

export const PostInput = z.object({
  postData: z.object({
    title: z.string(),
    price: z.number(),
    images: z.string().array(),
    address: z.string(),
    city: z.string(),
    bedroom: z.number(),
    bathroom: z.number(),
    longitude: z.string(),
    latitude: z.string(),
    type: z.enum(["buy", "rent"]),
    property: z.enum(["condo", "apartment", "land", "house"]),
  }),
  postDetails: z.object({
    desc: z.string(),
    utilities: z.string().optional(),
    pet: z.string().optional(),
    income: z.string().optional(),
    size: z.number().optional(),
    school: z.number().optional(),
    bus: z.number().optional(),
    restaurant: z.number().optional(),
  }),
});

export const PostQuery = z.object({
  city: z.string().optional(),
  type: z.string().optional(),
  property: z.string().optional(),
  bedroom: z.string().transform(val => parseInt(val, 10)).optional(),
  price: z.string().transform(val => parseInt(val, 10)).optional(),
  minPrice: z.string().transform(val => parseInt(val, 10)).optional(),
  maxPrice: z.string().transform(val => parseInt(val, 10)).optional()
})

export type PostInput = z.infer<typeof PostInput>;
export type PostQuery = z.infer<typeof PostQuery>;
