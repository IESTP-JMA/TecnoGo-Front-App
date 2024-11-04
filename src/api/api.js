import { client } from "./client";

export async function patchUser(userObj) {
  return client("/user", {
    method: "PATCH",
    body: userObj,
  });
}
