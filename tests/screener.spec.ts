import { test, expect } from "../Pages/fixture";
import user1 from "../DATA/user.json";

test.describe("File download,upload ", () => {
  test("Register and verify email on Screener.in using YOPmail", async ({
    page,
    context,
    scre,
  }) => {
    const yopEmail = user1.user1[0].User;
    const password = user1.user1[0].Password;
    await scre.launchWebsite();
    await scre.gotoRegistration();
    await scre.register(yopEmail, password);
    await scre.verifyEmailFromYopmail(context, yopEmail);
  });
});
