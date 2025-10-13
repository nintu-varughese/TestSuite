import { test, expect } from "../Pages/fixture";

test.describe("File download,upload ", () => {
  test("Register and verify email on Screener.in using YOPmail", async ({
    page,
    context,
    scre,
  }) => {
    const yopEmail = "playtest@yopmail.com";
    const password = "Test@12345";

    await scre.launchWebsite();
    await scre.gotoRegistration();
    await scre.register(yopEmail, password);
    await scre.verifyEmailFromYopmail(context, yopEmail);
  });
});
