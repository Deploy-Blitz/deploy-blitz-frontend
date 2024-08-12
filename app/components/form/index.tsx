import { useRemixFetcher } from "~/hooks/use-remix-fetcher";
import { Paragraph } from "../typography/paragraph";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { repoSchema } from "~/utils/schemas";
import { Button } from "../button";
import { useState } from "react";

export const FormRepos = ({ variant }: FormReposProps) => {
  const [tokenGenerate, setTokenGenerate] = useState(false);

  const fetcher = useRemixFetcher({
    onError: (e) => console.log(e),
    onSuccess: () => console.log("Success!"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      username: "",
      token: variant === "login" ? "temporal_token_12345689" : "",
      phone: "",
    },
    mode: "onChange",
    resolver: yupResolver<FormProps | any>(repoSchema),
  });

  console.log(errors);

  const onSubmit = handleSubmit((_data, e) => {
    const submitTarget = e?.target;

    try {
      fetcher.submit(submitTarget, {
        method: "POST",
        encType: "multipart/form-data",
      });

      reset();
    } catch (error) {
      console.log(error);
    }
  });

  const handleGenerateToken = () => {
    window.open(
      "https://github.com/settings/tokens/new?description=DeployBlitz%20GitHub%20token&scopes=repo%2Cgist%2Cread%3Aorg%2Cworkflow%2Cread%3Auser%2Cuser%3Aemail",
      "_blank"
    );

    setTokenGenerate(true);
  };

  return (
    <fetcher.Form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="username">
            <Paragraph style={{ color: "#FFFFFF" }}>Username</Paragraph>
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            className="bg-[#E0E0E0] rounded py-3 pl-3 outline-none w-full"
          />
        </div>

        {variant === "sign-up" ? (
          <div>
            <label htmlFor="token">
              <Paragraph style={{ color: "#FFFFFF" }}>Token access</Paragraph>
            </label>
            <input
              {...register("token")}
              type="text"
              id="token"
              className="bg-[#E0E0E0] rounded py-3 pl-3 outline-none w-full"
            />
          </div>
        ) : (
          <input {...register("token")} type="hidden" id="token" />
        )}

        <input type="hidden" {...register("phone")} id="phone" aria-hidden />
      </div>
      {!tokenGenerate && variant !== "login" ? (
        <div className="flex gap-2 justify-between">
          <Button variant="primary" type="submit">
            Sign up
          </Button>

          <Button variant="primary" type="button" onClick={handleGenerateToken}>
            Generate Access Token
          </Button>
        </div>
      ) : (
        <div>
          <Button variant="primary" type="submit">
            {variant === "login" ? "Login" : "Sign up"}
          </Button>
        </div>
      )}
    </fetcher.Form>
  );
};
