import { ActionFunction } from "@remix-run/node";
import { json, MetaFunction, useNavigate } from "@remix-run/react";
import { Button } from "~/components/button";
import { FormRepos } from "~/components/form";
import { H1 } from "~/components/typography/h1";
import { Paragraph } from "~/components/typography/paragraph";

export const meta: MetaFunction = () => {
  return [
    { title: "DEPLOYBLITZ" },
    { name: "description", content: "Welcome to DEPLOYBLITZ!" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  /* if ((formData.get("address") as string).toString().length > 0)
      return json({ success: false }); */

  const formDataObject = {
    name: formData.get("username") as string,
    email: formData.get("token") as string,
  };

  try {
    console.log(formDataObject);

    return json({ success: true });
  } catch (error) {
    return json({ success: false, error });
  }
};

export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1a1a1a] h-[calc(100dvh-69px)] px-4 pt-20 flex flex-col gap-10">
      <div>
        <div className="mb-6 text-center flex flex-col gap-4">
          <H1 style={{ color: "#FFFFFF" }}>Welcome to</H1>
          <img
            src="/images/logoHero.svg"
            alt="Deployblitz logo in principal page"
          />
        </div>

        <div className="text-center">
          <Paragraph style={{ color: "#FFFFFF" }}>
            You need to access the repositories in your GitHub account, so
            you'll need to provide your username and an access token provided by
            GitHub.
          </Paragraph>
          {/* <Paragraph style={{ color: "#FFFFFF" }}>
            Please enter your Fine-grained personal access tokens or your
            Personal access tokens from GitHub.
          </Paragraph> */}
        </div>
      </div>
      {/* <FormRepos /> */}
      <div className="w-fit mx-auto">
        <Button
          variant="url"
          onClick={() => navigate({ pathname: "/sign-up" })}
        >
          Don't have a registered user? Sign up.
        </Button>
      </div>
    </div>
  );
}
