import axios from "axios";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  const { data } = await axios.post("/api/users/login", { email, password });
  return data;
};