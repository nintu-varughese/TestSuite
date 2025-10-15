import { test, expect } from "../Pages/fixture";
import menuData from "../DATA/menuData.json";

test.describe("QA PLAYGROUND SITE DEMO FUNCTIONALITIES", () => {
  test("Identifying superhero name and checking if the real name is same as expected", async ({
    playg,
  }) => {
    await playg.launchWebsite();
    await expect(playg.mainHead, "Main heading should be visible").toBeVisible();
    await playg.moveToDynamicTable();
    await expect(playg.spideRealName, "Expected name to be Peter Parker").toHaveText("Peter Parker");
  });

  test("Check superhero name is NOT Batman for spiderman", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.moveToDynamicTable();
    await playg.verifyIncorrectSuperheroName("Batman");
  });

  test("Check superhero name is NOT empty in the table", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.moveToDynamicTable();
    await playg.verifySuperheroNameIsEmpty();
  });

  test('Check superhero name in the table does NOT contain "man"', async ({ playg }) => {
    await playg.launchWebsite();
    await playg.moveToDynamicTable();
    await playg.verifyPartialSuperheroName("man");
  });

  test("Check superhero name in the table does NOT contain numbers", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.moveToDynamicTable();
    await playg.verifySuperheroNameNoNumbers();
  });

  test("Verify account by entering the digit nine in the input filed and validate success message is displayed", async ({
    playg,
  }) => {
    await playg.launchWebsite();
    await playg.moveToVerifyAcc();
    await expect(playg.verifyHead, "Verification heading should be visible").toBeVisible();
    await playg.enterDataNine("9");
    await expect(playg.successMsg, "Success message should be displayed after entering 9").toBeVisible();
  });

  test("Verify account by entering the wrong digit  in the input filed and validate success message is not displayed", async ({
    playg,
  }) => {
    await playg.launchWebsite();
    await playg.moveToVerifyAcc();
    await expect(playg.verifyHead, "Verification heading should be visible").toBeVisible();
    await playg.enterDataNine("8");
    await expect(playg.successMsg, "Success message should NOT be displayed after wrong input").not.toBeVisible();
  });

  test("Add and remove tags and verify remaining tags count is displayed", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.moveToTags();
    await expect(playg.tagsHead, "Tags heading should be visible").toBeVisible();
    await playg.enterTags();
    await expect(playg.countP, "Remaining tags count should be zero initially").toHaveText("0");
    await playg.removeTag("python");
    await expect(playg.countP, "Remaining tags count should be one after removing").toHaveText("1");
  });

  test("Open new tab by clicking on the button and verify a message is the displayed in the new page", async ({
    playg,
  }) => {
    await playg.launchWebsite();
    await playg.navToNewTab();
    await playg.clickOnNewTab();
    await expect(playg.newTabHead, "Heading in new tab should be visible").toBeVisible();
  });

  test("Open pop-up and click on the button in it and verify a message is the displayedon the main window", async ({
    playg,
  }) => {
    await playg.launchWebsite();
    await playg.navGateToPop();
    await playg.getPopUp();
    await expect(playg.popMesage, "Popup message should be visible").toHaveText("Click to open pop-up");
    await playg.popedUpSubmit();
    await expect(playg.popMesage, "Popup message should change after button click").toHaveText("Button Clicked");
  });

  test("Click on the button in the iframe that is in another iframe and verify success message is displayed", async ({
    playg,
  }) => {
    await playg.launchWebsite();
    await playg.goToIframe();
    await playg.clickIframeB();
    await expect(playg.iframeVal, "Iframe success message should be visible").toBeVisible();
  });

  test("Open each link in the navigaion window and assert the pages content", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.gotoNavigationMenu();
    await expect(playg.homeLink, "Home link text should be correct").toHaveText("Home");
    await playg.gotoAbout();
    await expect(playg.validationHead, "About page heading should be visible").toHaveText("Welcome to the About Page");
    await playg.goBackNav();
    await playg.gotoBlog();
    await expect(playg.validationHead, "Blog page heading should be visible").toHaveText("Welcome to the Blog Page");
    await playg.goBackNav();
    await playg.gotoPortfolio();
    await expect(playg.validationHead, "Portfolio page heading should be visible").toHaveText("Welcome to the Portfolio Page");
    await playg.goBackNav();
    await playg.gotoContact();
    await expect(playg.validationHead, "Contact page heading should be visible").toHaveText("Welcome to the Contact Page");
  });

  test("Click on the hidden button and verify hidden message is displayed", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.navToCoveredPage();
    await expect(playg.coveredHeadVal, "Covered page heading should be visible").toHaveText("Click the button below");
    await playg.coveredButtonClick();
    await expect(playg.coveredHeadVal, "Mission accomplished text should appear").toHaveText("Mission accomplished");
  });

  test("Put mouse pointer on an image and verify movie price is displayed", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.gotoHoverImage();
    await playg.hoverOverImage();
    await expect(playg.hoverPrice, "Movie price should appear after hover").toHaveText("$24.96");
  });

  test("Upload an image file and verify the file name is displayed", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.fileUploadNavigation();
    await playg.fileUploading();
    await expect(playg.fileUpldVal, "Uploaded file count should be displayed").toContainText("1");
  });

  test("Click on each menu and sub-menu item and assert the message displayed", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.navToRightContext();

    const menuItems = menuData.menuItems;
    const subMenuItems = menuData.subMenuItems;

    for (let index = 0; index < menuItems.length; index++) {
      await playg.rightClick();
      await playg.menuItemClick(menuItems[index]);
      await expect(playg.contextVal, `Menu item ${menuItems[index]} should be clicked`).toHaveText(
        "Menu item " + menuItems[index] + " clicked"
      );
    }

    for (let index = 0; index < subMenuItems.length; index++) {
      await playg.rightClick();
      await playg.menuItemHover("Share");
      await playg.menuItemClick(subMenuItems[index]);
      await expect(playg.contextVal, `Submenu item ${subMenuItems[index]} should be clicked`).toHaveText(
        "Menu item " + subMenuItems[index] + " clicked"
      );
    }
  });

  test("Click on the button and assert that progress is on the 95 percent", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.goToShadowDom();
    await playg.shadowButtonClick();
    await expect(playg.progressBar, "Progress bar percent attribute should be 95").toHaveAttribute("percent", "95", {
      timeout: 9000,
    });
  });

  test("Set slider value to 50 and submit feedback by clicking on the button", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.navigateToSlider();
    await playg.moveSliderUntilFeedbackVisible();
    await expect(playg.sliderVal, "Feedback message should appear after slider set to 50").toHaveText(
      "Thank you for your feedback!"
    );
  });

  test("Download a file and assert the files name and size", async ({ playg }) => {
    await playg.launchWebsite();
    await playg.navToDownloadFile();
    await playg.downloadFile();
  });

  test("Close modal popup if displayed and assert welcome message", async ({ playg }) => {
    await playg.openModalPopupSection();
    await expect(
      playg.welcomeMessage,
      'Modal popup welcome message "Welcome Peter Parker!" is not visible.'
    ).toBeVisible();
  });

  test("Wait until API data is fetched and then assert loaded posts", async ({ playg }) => {
    await playg.launchFetchWebsite();
    await playg.openFetchData();
    const cardCount = await playg.openFetchData();
    await expect(cardCount, "Count not greater than 90").toBeGreaterThan(90);
  });

  test("Verify redirect chain messages and go back button", async ({ playg }) => {
    await playg.clickHeader();
    await playg.clickRedirectLink();
    await playg.goBackButton.waitFor({ state: "visible", timeout: 10000 });
    await expect(playg.goBackButton, 'Redirect chain failed: "Go Back" button not visible').toBeVisible();
  });
});
