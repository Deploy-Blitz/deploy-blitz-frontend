import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  return redirect("/login");

  return null;
};

export default function Index() {
  return null;
}
