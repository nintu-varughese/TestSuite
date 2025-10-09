
import { waitForDebugger } from 'inspector';
import { test, expect } from '../Pages/fixture';
import { prependListener } from 'process';

  test.describe('QA PLAYGROUND SITE DEMO FUNCTIONALITIES ', () => {

    
    test('Identifying superhero name and checking if the real name is same as expected',async({ playg}) =>
        {
            await playg.Launchwebsite();
            await expect(playg.Mainhead).toBeVisible()
            await playg.movetoDynamicTable();
            await expect(playg.spiderealname).toHaveText("Peter Parker")
        })
        test('Check superhero name is NOT Batman for spiderman', async ({ playg }) => {
            await playg.Launchwebsite();
            await playg.movetoDynamicTable();
           await playg.verifyIncorrectSuperheroName("Batman");
        });

        test('Check superhero name is NOT empty in the table', async ({ playg }) => {
            await playg.Launchwebsite();
            await playg.movetoDynamicTable();
           await playg.verifySuperheroNameIsEmpty();
        });

        test('Check superhero name in the table does NOT contain "man"', async ({ playg }) => {
            await playg.Launchwebsite();
            await playg.movetoDynamicTable();
             await playg.verifyPartialSuperheroName("man");
        });

        test('Check superhero name in the table does NOT contain numbers', async ({ playg }) => {
            await playg.Launchwebsite();
            await playg.movetoDynamicTable();
            await playg.verifySuperheroNameNoNumbers();
        });

    test('Verify account by entering the digit nine in the input filed and validate success message is displayed',async({ playg}) =>
        {
            await playg.Launchwebsite();
            await playg.movetoVerifyacc();
            await expect(playg.Verifyhead).toBeVisible()
            await playg.enterdataNine("9");
            await expect(playg.successmesg).toBeVisible()
        })

        test('Verify account by entering the wrong digit  in the input filed and validate success message is not displayed',async({ playg}) =>
        {
            await playg.Launchwebsite();
            await playg.movetoVerifyacc();
            await expect(playg.Verifyhead).toBeVisible()
            await playg.enterdataNine("8");
            await expect(playg.successmesg).not.toBeVisible()
        })

    test('Add and remove tags and verify remaining tags count is displayed',async({ playg}) =>
        {
            await playg.Launchwebsite();
            await playg.MovetoTags();
            await expect(playg.Tagshead).toBeVisible()
            await playg.Enteratgs();
            await expect(playg.countp).toHaveText("0")
            await playg.removetag("python")
            await expect(playg.countp).toHaveText("1")
        })

       test('Open new tab by clicking on the button and verify a message is the displayed in the new page',async({ playg}) =>
        {
            await playg.Launchwebsite();
            await playg.navtonewtab();
            await playg.clickonnewtab();
            await expect(playg.newtabHead).toBeVisible();
        })

       test('Open pop-up and click on the button in it and verify a message is the displayedon the main window',async({ playg}) =>
        {
            await playg.Launchwebsite();
            await playg.navgatetopop();
            await playg.getpopup();
            await expect(playg.popmesage).toHaveText("Click to open pop-up")
            await playg.popedupsubmit();
            await expect(playg.popmesage).toHaveText("Button Clicked")

        })

        test('Click on the button in the iframe that is in another iframe and verify success message is displayed',async({ playg}) =>
        {
            await playg.Launchwebsite();
            await playg.gotoiframe();
            await playg.clickiframeb();
            await expect(playg.iframval).toBeVisible();
        })
        

        test('Open each link in the navigaion window and assert the pages content',async({ playg}) =>
        {
            await playg.Launchwebsite();
            await playg.Gotonavigationmenu();
            await expect(playg.homelink).toHaveText("Home")
            await playg.gotoAbout();
            await expect(playg.Validationhead).toHaveText("Welcome to the About Page")
            await playg.goBacknav();
            await playg.gotoBlog();
            await expect(playg.Validationhead).toHaveText("Welcome to the Blog Page")
            await playg.goBacknav();
            await playg.gotoportfolio();
            await expect(playg.Validationhead).toHaveText("Welcome to the Portfolio Page")
            await playg.goBacknav();
            await playg.gotocontact()
            await expect(playg.Validationhead).toHaveText("Welcome to the Contact Page")
        })

        test('Click on the hidden button and verify hidden message is displayed',async({ playg}) =>
        {
            await playg.Launchwebsite();
            await playg.navtocoveredpage();
            await expect(playg.Coveredheadval).toHaveText("Click the button below")
            await playg.coveredButtonclick();
            await expect(playg.Coveredheadval).toHaveText("Mission accomplished")
        })

        test('Put mouse pointer on an image and verify movie price is displayed',async({ playg}) =>
        {
            await playg.Launchwebsite();
            await playg.gotoHoverimage();
            await playg.hoveroverimage();
            await expect(playg.hoverprice).toHaveText("$24.96")

        })

        test('Upload an image file and verify the file name is displayed',async({playg})=>
        {
          await playg.Launchwebsite();
          await playg.fileuploadnavigation()
          await playg.fileuploading()
          await expect(playg.fileupldval).toContainText("1")


        })


        test('Click on each menu and sub-menu item and assert the message displayed',async({playg})=>
        {
          await playg.Launchwebsite();
          await playg.navtorightcontext();
          const menuItems = ["Preview", "Get Link", "Rename", "Delete", "Settings"];
          const subMenuItems = ["Twitter", "Instagram", "Dribble", "Telegram"];

          for(let index=0;index<menuItems.length;index++)
          { 

            await playg.rightclick();
            await playg.MenuitemCLick(menuItems[index])
            await expect(playg.contextVal).toHaveText("Menu item "+menuItems[index]+" clicked")

          }

          for(let index=0;index<subMenuItems.length;index++)
          { 
            
            await playg.rightclick();
            await playg.menuitemHover("Share")
            await playg.MenuitemCLick(subMenuItems[index])
            await expect(playg.contextVal).toHaveText("Menu item "+subMenuItems[index]+" clicked")

          }

        })

    
        test('Click on the button and assert that progress is on the 95 percent',async({playg})=>
        {
          await playg.Launchwebsite();
          await playg.gotoshadowdom();
          await playg.shadowButtonClick();
          await expect(playg.progressBar).toHaveAttribute("percent", "95", { timeout: 9000 });
        })


        test('Set slider value to 50 and submit feedback by clicking on the button',async({playg})=>
        {
          await playg.Launchwebsite();
          await playg.navigatetoSlider();
          await playg.moveSliderUntilFeedbackVisible();
          await expect(playg.sliderVal).toHaveText("Thank you for your feedback!")
        })

       test('Download a file and assert the files name and size',async({playg})=>
        {
          await playg.Launchwebsite();
          await playg.navtodownloadfile();
          await playg.downloadFile();
        })




    



 

        
  });

