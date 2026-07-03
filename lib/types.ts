import { z } from "zod";

export const PlayerSchema = z.object({
  name: z.string(),
  avatar: z.string(),
  event: z.string(),
});
export type Player = z.infer<typeof PlayerSchema>;

export const LoginResponseSchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), player: PlayerSchema }),
  z.object({ status: z.literal("fail"), error: z.string() }),
]);
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const LogoutResponseSchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success") }),
  z.object({ status: z.literal("fail"), error: z.string() }),
]);
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;

export const GameSchema = z.object({
  name: z.string(),
  description: z.string(),
  code: z.string(),
  icon: z.string(),
  categoryIds: z.array(z.number()),
});
export type Game = z.infer<typeof GameSchema>;

export const GamesResponseSchema = z.array(GameSchema);

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;

export const CategoriesResponseSchema = z.array(CategorySchema);
