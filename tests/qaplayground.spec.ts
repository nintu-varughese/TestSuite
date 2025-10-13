import { test, expect } from "../Pages/fixture";
import menuData from "../DATA/menuData.json";

test.describe("QA PLAYGROUND SITE DEMO FUNCTIONALITIES ", () => {
  test("Identifying superhero name and checking if the real name is same as expected", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await expect(
      playg.Mainhead,
      "Main heading should be visible"
    ).toBeVisible();
    await playg.movetoDynamicTable();
    await expect(
      playg.spiderealname,
      "Expected name to be Peter Parker"
    ).toHaveText("Peter Parker");
  });

  test("Check superhero name is NOT Batman for spiderman", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.movetoDynamicTable();
    await playg.verifyIncorrectSuperheroName("Batman");
  });

  test("Check superhero name is NOT empty in the table", async ({ playg }) => {
    await playg.Launchwebsite();
    await playg.movetoDynamicTable();
    await playg.verifySuperheroNameIsEmpty();
  });

  test('Check superhero name in the table does NOT contain "man"', async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.movetoDynamicTable();
    await playg.verifyPartialSuperheroName("man");
  });

  test("Check superhero name in the table does NOT contain numbers", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.movetoDynamicTable();
    await playg.verifySuperheroNameNoNumbers();
  });

  test("Verify account by entering the digit nine in the input filed and validate success message is displayed", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.movetoVerifyacc();
    await expect(
      playg.Verifyhead,
      "Verification heading should be visible"
    ).toBeVisible();
    await playg.enterdataNine("9");
    await expect(
      playg.successmesg,
      "Success message should be displayed after entering 9"
    ).toBeVisible();
  });

  test("Verify account by entering the wrong digit  in the input filed and validate success message is not displayed", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.movetoVerifyacc();
    await expect(
      playg.Verifyhead,
      "Verification heading should be visible"
    ).toBeVisible();
    await playg.enterdataNine("8");
    await expect(
      playg.successmesg,
      "Success message should NOT be displayed after wrong input"
    ).not.toBeVisible();
  });

  test("Add and remove tags and verify remaining tags count is displayed", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.MovetoTags();
    await expect(
      playg.Tagshead,
      "Tags heading should be visible"
    ).toBeVisible();
    await playg.Enteratgs();
    await expect(
      playg.countp,
      "Remaining tags count should be zero initially"
    ).toHaveText("0");
    await playg.removetag("python");
    await expect(
      playg.countp,
      "Remaining tags count should be one after removing"
    ).toHaveText("1");
  });

  test("Open new tab by clicking on the button and verify a message is the displayed in the new page", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.navtonewtab();
    await playg.clickonnewtab();
    await expect(
      playg.newtabHead,
      "Heading in new tab should be visible"
    ).toBeVisible();
  });

  test("Open pop-up and click on the button in it and verify a message is the displayedon the main window", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.navgatetopop();
    await playg.getpopup();
    await expect(playg.popmesage, "Popup message should be visible").toHaveText(
      "Click to open pop-up"
    );
    await playg.popedupsubmit();
    await expect(
      playg.popmesage,
      "Popup message should change after button click"
    ).toHaveText("Button Clicked");
  });

  test("Click on the button in the iframe that is in another iframe and verify success message is displayed", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.gotoiframe();
    await playg.clickiframeb();
    await expect(
      playg.iframval,
      "Iframe success message should be visible"
    ).toBeVisible();
  });

  test("Open each link in the navigaion window and assert the pages content", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.Gotonavigationmenu();
    await expect(playg.homelink, "Home link text should be correct").toHaveText(
      "Home"
    );
    await playg.gotoAbout();
    await expect(
      playg.Validationhead,
      "About page heading should be visible"
    ).toHaveText("Welcome to the About Page");
    await playg.goBacknav();
    await playg.gotoBlog();
    await expect(
      playg.Validationhead,
      "Blog page heading should be visible"
    ).toHaveText("Welcome to the Blog Page");
    await playg.goBacknav();
    await playg.gotoportfolio();
    await expect(
      playg.Validationhead,
      "Portfolio page heading should be visible"
    ).toHaveText("Welcome to the Portfolio Page");
    await playg.goBacknav();
    await playg.gotocontact();
    await expect(
      playg.Validationhead,
      "Contact page heading should be visible"
    ).toHaveText("Welcome to the Contact Page");
  });

  test("Click on the hidden button and verify hidden message is displayed", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.navtocoveredpage();
    await expect(
      playg.Coveredheadval,
      "Covered page heading should be visible"
    ).toHaveText("Click the button below");
    await playg.coveredButtonclick();
    await expect(
      playg.Coveredheadval,
      "Mission accomplished text should appear"
    ).toHaveText("Mission accomplished");
  });

  test("Put mouse pointer on an image and verify movie price is displayed", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.gotoHoverimage();
    await playg.hoveroverimage();
    await expect(
      playg.hoverprice,
      "Movie price should appear after hover"
    ).toHaveText("$24.96");
  });

  test("Upload an image file and verify the file name is displayed", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.fileuploadnavigation();
    await playg.fileuploading();
    await expect(
      playg.fileupldval,
      "Uploaded file count should be displayed"
    ).toContainText("1");
  });

  test("Click on each menu and sub-menu item and assert the message displayed", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.navtorightcontext();

    const menuItems = menuData.menuItems;
    const subMenuItems = menuData.subMenuItems;

    for (let index = 0; index < menuItems.length; index++) {
      await playg.rightclick();
      await playg.MenuitemCLick(menuItems[index]);
      await expect(
        playg.contextVal,
        `Menu item ${menuItems[index]} should be clicked`
      ).toHaveText("Menu item " + menuItems[index] + " clicked");
    }

    for (let index = 0; index < subMenuItems.length; index++) {
      await playg.rightclick();
      await playg.menuitemHover("Share");
      await playg.MenuitemCLick(subMenuItems[index]);
      await expect(
        playg.contextVal,
        `Submenu item ${subMenuItems[index]} should be clicked`
      ).toHaveText("Menu item " + subMenuItems[index] + " clicked");
    }
  });

  test("Click on the button and assert that progress is on the 95 percent", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.gotoshadowdom();
    await playg.shadowButtonClick();
    await expect(
      playg.progressBar,
      "Progress bar percent attribute should be 95"
    ).toHaveAttribute("percent", "95", {
      timeout: 9000,
    });
  });

  test("Set slider value to 50 and submit feedback by clicking on the button", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.navigatetoSlider();
    await playg.moveSliderUntilFeedbackVisible();
    await expect(
      playg.sliderVal,
      "Feedback message should appear after slider set to 50"
    ).toHaveText("Thank you for your feedback!");
  });

  test("Download a file and assert the files name and size", async ({
    playg,
  }) => {
    await playg.Launchwebsite();
    await playg.navtodownloadfile();
    await playg.downloadFile();
  });
});
