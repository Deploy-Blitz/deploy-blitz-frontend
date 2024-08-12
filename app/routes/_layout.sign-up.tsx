import { ActionFunction } from "@remix-run/node";
import { json, MetaFunction } from "@remix-run/react";
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

  if (formData.get("phone")) return json({ success: false });

  const formDataObject = {
    username: formData.get("username") as string,
    token: formData.get("token") as string,
  };

  try {
    console.log(formDataObject);

    return json({ success: true });
  } catch (error) {
    return json({ success: false, error });
  }
};

export default function SignUp() {
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
      <FormRepos variant="sign-up" />
    </div>
  );
}
