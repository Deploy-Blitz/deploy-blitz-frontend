import { object, string } from "yup";

export const repoSchema = object().shape({
  username: string().required().min(2),
  token: string().required(),
});
