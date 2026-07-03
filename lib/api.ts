import {
  CategoriesResponseSchema,
  Category,
  Game,
  GamesResponseSchema,
  LoginResponse,
  LoginResponseSchema,
  LogoutResponse,
  LogoutResponseSchema,
} from "./types";

const jsonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ username, password }),
  });
  return LoginResponseSchema.parse(await res.json());
}

export async function logout(username: string): Promise<LogoutResponse> {
  const res = await fetch("/api/logout", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ username }),
  });
  return LogoutResponseSchema.parse(await res.json());
}

export async function getGames(): Promise<Game[]> {
  const res = await fetch("/api/games");
  return GamesResponseSchema.parse(await res.json());
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories");
  return CategoriesResponseSchema.parse(await res.json());
}
