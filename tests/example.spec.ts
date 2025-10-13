
import { test, expect } from "../Pages/fixture";

test.describe("File download,upload and drrag drop functionalities  ", () => {
  test("Download a txt file from the site and validating the contents inside the file match", async ({
    custom,
  }) => {
    await custom.Launchwebsite();
    expect(custom.Mainhead).toBeVisible();
    await custom.GotoMorepage();
    await custom.NavigatetoDownloadpage();
    expect(
      custom.Downloadpageheading,
      "expected download page header is not visible"
    ).not.toBeVisible();
    await custom.Enterdataintextbox();
    await custom.GenerateDownlink();
    expect(custom.Downloadfil).toBeVisible();
    await custom.DownloadFile();
  });
  test("upload,remove and upload a file and verify the status", async ({
    custom,
  }) => {
    await custom.Launchwebsite();
    expect(custom.Mainhead).toBeVisible();
    await custom.GotoMorepage();
    await custom.NavigatetoUploadpage();
    await custom.uploadFile();
    //expect(custom.UploadInput).toHaveText('info.txt')
    await custom.removeFile();
    await expect(
      custom.UploadInput,
      "The file input is expected to have no file"
    ).toHaveText("");
    await custom.uploadFile();
    await custom.submitupload();
  });

  test("Static Drag and drop image and verify the image is added", async ({
    custom,
  }) => {
    await custom.Launchwebsite();
    await custom.NavigattoInteraction();
    await custom.gotodraganddrop();
    await custom.Navigatetostatic();
    await custom.staticdraganddrop();
    const html = await custom.checkdrop.innerHTML();
    expect(html, "Expected to display dragged image ").toContain("<img");
  });
  test("dynamic Drag and drop image and verify the image is added", async ({
    custom,
  }) => {
    await custom.Launchwebsite();
    await custom.NavigattoInteraction();
    await custom.gotodraganddrop();
    await custom.Navigatetodynamic();
    await custom.dynamicdraganddrop();
    const html = await custom.checkdrop.innerHTML();
    expect(html, "Expected to display the drag and dropped image").toContain(
      "<img"
    );
  });
});
