import { Page, test, Locator, expect } from '@playwright/test';
import { SrvRecord } from 'dns';
import path from 'path';
import fs from 'fs';

export default class Playground {

    // Page reference
    readonly page: Page;

    // Locators for Dynamic Table
    readonly Mainhead: Locator;
    readonly DynamicTablelink: Locator;
    readonly spidermanName: Locator;
    readonly spiderealname: Locator;

    // Locators for Verify Account
    readonly Verifyacclink: Locator;
    readonly Verifyhead: Locator;
    readonly successmesg: Locator;

    // Locators for Tags Input Box
    readonly Tagsinput: Locator;
    readonly Tagshead: Locator;
    readonly Inp: Locator;
    readonly countp: Locator;
    readonly remov: (word: string) => Locator;

    // Locators for New Tab
    readonly Newtab: Locator;
    readonly opentabb: Locator;
    readonly newtabHead: Locator;

    // Locators for Pop-up
    readonly popuptab: Locator;
    readonly Popup: Locator;
    readonly popedupb: Locator;
    readonly popmesage: Locator;

    // Locators for Nested Iframe
    readonly iframlink: Locator;
    readonly iframClickb: Locator;
    readonly iframval: Locator;

    // Locators for Navigation Menu
    readonly navigationmenulink: Locator;
    readonly homelink: Locator;
    readonly aboutlink: Locator;
    readonly bloglink: Locator;
    readonly portfolio: Locator;
    readonly contact: Locator;
    readonly Validationhead: Locator;
    readonly Goback: Locator;

    // Locators for Covered Elements
    readonly gotoCoveredele: Locator;
    readonly Coveredheadval: Locator;
    readonly coveredButton: Locator;

    // Locators for Hover Image
    readonly hoverimagelink: Locator;
    readonly hoverimage: Locator;
    readonly hoverprice: Locator;

    // Locators for File Upload
    readonly fileuploadLink: Locator;
    readonly fileupld: Locator;
    readonly fileupldval: Locator;

    // Locators for Budget Tracker
    readonly budgettrackerLink: Locator;
    readonly NewentryButton: Locator;
    readonly Rowforentry: (id: string) => Locator;

    // Locators for Right-Click Context Menu
    readonly rightclickcontentLink: Locator;
    readonly contextcontent: (menu: string) => Locator;
    readonly contextVal: Locator;

    // Locators for Shadow DOM
    readonly shadowDomLink: Locator;
    readonly progressBar: Locator;

    // Locators for Slider
    readonly ratingSlider: Locator;
    readonly sliderVal: Locator;

    // Locator for Download File
    readonly downloadFileLink: Locator;

    private readonly sliderInput: Locator;
    private readonly sendFeedbackButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Dynamic Table locators
        this.Mainhead = page.locator('//span[text()="QA Playground"]');
        this.DynamicTablelink = page.locator('//h3[text()="Dynamic Table"]');
        this.spidermanName = page.locator('//div[text()="Spider-Man"]');
        this.spiderealname = page.locator('//div[text()="Spider-Man"]/ancestor::tr//span[contains(@class,"text-white-900")]');

        // Verify Account locators
        this.Verifyacclink = page.locator('//h3[text()="Verify Your Account"]');
        this.Verifyhead = page.locator('//h2[text()="Verify Your Account"]');
        this.successmesg = page.locator('//small[text()="Success"]');

        // Tags Input Box locators
        this.Tagsinput = page.locator('//h3[text()="Tags Input Box"]');
        this.Tagshead = page.locator('//h2[text()="Tags"]');
        this.Inp = page.locator('//input');
        this.countp = page.locator('//p/span');
        this.remov = (word: string) => page.locator(`//li[normalize-space(text())='${word}']/i`);

        // New Tab locators
        this.Newtab = page.locator('//h3[text()="New Tab"]');
        this.opentabb = page.locator('//a[text()="Open New Tab"]');
        this.newtabHead = page.locator('//h1[text()="Welcome to the new page!"]');

        // Pop-Up locators
        this.popuptab = page.locator('//h3[text()="Pop-Up Window"]');
        this.Popup = page.locator('//a[text()="Open"]');
        this.popedupb = page.locator('//button[text()="Submit"]');
        this.popmesage = page.locator('//p[@id="info"]');

        // Nested Iframe locators
        this.iframlink = page.locator('//h3[text()="Nested Iframe"]');
        this.iframClickb = page.locator('//a[text()="Click Me"]');
        this.iframval = page.frameLocator("#frame1").frameLocator("#frame2").locator("#msg");

        // Navigation Menu locators
        this.navigationmenulink = page.locator('//h3[text()="Navigation Menu"]');
        this.homelink = page.locator('//a[text()="Home"]');
        this.aboutlink = page.locator('//a[text()="About"]');
        this.bloglink = page.locator('//a[text()="Blog"]');
        this.portfolio = page.locator('//a[text()="Portfolio"]');
        this.contact = page.locator('//a[text()="Contact"]');
        this.Validationhead = page.locator('//h1[@id="title"]');
        this.Goback = page.locator('//a[text()="Go Back"]');

        // Covered Elements locators
        this.gotoCoveredele = page.locator('//h3[text()="Covered Elements"]');
        this.Coveredheadval = page.locator('//div[@class="wrapper"]/p');
        this.coveredButton = page.locator('//div[@class="wrapper"]/a');

        // Hover Image locators
        this.hoverimagelink = page.locator('//h3[text()="Mouse Hover"]');
        this.hoverimage = page.locator('//img[@class="poster"]');
        this.hoverprice = page.locator('//p[@class="current-price"]');

        // File Upload locators
        this.fileuploadLink = page.locator('//h3[text()="Upload File"]');
        this.fileupld = page.locator('//i[@class="fas fa-upload"]');
        this.fileupldval = page.locator('//p[@id="num-of-files"]');

        // Budget Tracker locators
        this.budgettrackerLink = page.locator('//h3[text()="Budget Tracker"]');
        this.NewentryButton = page.locator('//button[text()="New Entry"]');
        this.Rowforentry = (id: String) => page.locator(`//table[@class="budget-tracker"]/tbody/tr[${id}]`);

        // Right-Click Context Menu locators
        this.rightclickcontentLink = page.locator('//h3[text()="Right-Click Context Menu"]');
        this.contextcontent = (menu: string) => page.locator(`//span[text()="${menu}"]`);
        this.contextVal = page.locator('//p[@id="msg"]');

        // Shadow DOM locators
        this.shadowDomLink = page.locator('//h3[text()="Shadow DOM"]');
        this.progressBar = page.locator("progress-bar");

        // Slider locators
        this.ratingSlider = page.locator('//h3[text()="Rating Range Slider"]');
        this.sliderVal = page.locator('//p[@id="ty-msg"]');

        // Download File locator
        this.downloadFileLink = page.locator('//h3[text()="Download File"]');

        // Slider input and feedback button
        this.sendFeedbackButton = page.locator('//button[@id="feedback"]');
        this.sliderInput = page.locator('//input[@type="range"]');
    }

    // Launch QA Playground website
    async Launchwebsite() {
        await this.page.goto('https://qaplayground.dev/#apps');
    }

    // Navigate to Dynamic Table section
    async movetoDynamicTable() {
        await this.DynamicTablelink.click();
    }

    // Verify superhero name is NOT expected (Negative test)
    async verifyIncorrectSuperheroName(expectedName: string) {
        const actualName = await this.spiderealname.textContent();
        expect(actualName?.trim()).not.toBe(expectedName);
    }

    // Verify superhero name is NOT empty
    async verifySuperheroNameIsEmpty() {
        const actualName = await this.spiderealname.textContent();
        expect(actualName?.trim()).not.toBe("");
    }

    // Verify superhero name does NOT contain specific substring
    async verifyPartialSuperheroName(wrongPart: string) {
        const actualName = await this.spiderealname.textContent();
        expect(actualName?.includes(wrongPart)).toBeFalsy();
    }

    // Verify superhero name does NOT contain numbers
    async verifySuperheroNameNoNumbers() {
        const actualName = await this.spiderealname.textContent();
        const regex = /\d/;
        expect(regex.test(actualName || "")).toBeFalsy();
    }

    // Navigate to Verify Account section
    async movetoVerifyacc() {
        await this.Verifyacclink.click();
    }

    // Enter code in Verify Account input fields
    async enterdataNine(number: string) {
        const codeFields = this.page.locator(".code");
        for (let index = 0; index < (await codeFields.count()); index++) {
            codeFields.nth(index).fill(number);
            await expect(codeFields.nth(index)).toHaveValue(number);
        }
        await this.page.keyboard.press('Enter');
    }

    // Navigate to Tags Input Box section
    async MovetoTags() {
        this.Tagsinput.click();
    }

    // Enter multiple tags
    async Enteratgs() {
        const newTags = ["vue", "python", "go", "react", "svelte", "tailwind", "linux", "ios", "android", "docker"];
        for (let index = 0; index < 10; index++) {
            await this.Inp.fill(newTags[index]);
            await this.Inp.click();
            await this.page.keyboard.press('Enter');
        }
    }

    // Remove a specific tag
    async removetag(word: string) {
        await this.remov(word).click();
    }

    // Navigate to New Tab section
    async navtonewtab() {
        await this.Newtab.click();
    }

    // Open new tab
    async clickonnewtab() {
        await this.opentabb.click();
    }

    // Navigate to Pop-Up section
    async navgatetopop() {
        await this.popuptab.click();
    }

    // Open pop-up window
    async getpopup() {
        await this.Popup.click();
    }

    // Submit pop-up
    async popedupsubmit() {
        const [popup] = await Promise.all([
            await this.page.waitForEvent("popup"),
            await this.page.locator("#login").click(),
        ]);
        await popup.locator("button").click();
    }

    // Navigate to Nested Iframe section
    async gotoiframe() {
        await this.iframlink.click();
    }

    // Click button inside nested iframe
    async clickiframeb() {
        const Button = this.page.frameLocator("#frame1").frameLocator("#frame2").locator("text=Click Me");
        await Button.click();
    }

    // Navigate to Navigation Menu section
    async Gotonavigationmenu() {
        await this.navigationmenulink.click();
    }

    async gotoAbout() { await this.aboutlink.click(); }
    async gotoBlog() { await this.bloglink.click(); }
    async gotocontact() { await this.contact.click(); }
    async gotoportfolio() { await this.portfolio.click(); }
    async goBacknav() { await this.Goback.click(); }

    // Navigate to Covered Elements section
    async navtocoveredpage() { await this.gotoCoveredele.click(); }
    async coveredButtonclick() { await this.coveredButton.click(); }

    // Navigate to Hover Image section
    async gotoHoverimage() { this.hoverimagelink.click(); }
    async hoveroverimage() { this.hoverimage.hover(); }

    // Navigate to File Upload section
    async fileuploadnavigation() { this.fileuploadLink.click(); }
    async fileuploading() {
        const file = "Pages\\downloads\\info.txt";
        await this.page.setInputFiles("#file-input", file);
        await this.page.waitForTimeout(1000);
        const firstImageCaption = this.page.locator("#images >> figure >> nth=0 >> figcaption");
        await expect(firstImageCaption).toContainText("info.txt");
    }

    // Navigate to Budget Tracker section
    async navigatetobudgettracker() { await this.budgettrackerLink.click(); }
    async addnewentery() { await this.NewentryButton.click(); }

    // Navigate to Right-Click Context Menu section
    async navtorightcontext() {
        await this.rightclickcontentLink.click();
        await this.page.waitForTimeout(500);
    }
    async rightclick() { await this.page.mouse.click(964, 258, { button: 'right' }); }
    async MenuitemCLick(menu: string) { await this.contextcontent(menu).click(); }
    async menuitemHover(menu: string) { await this.contextcontent(menu).hover(); }

    // Navigate to Shadow DOM section
    async gotoshadowdom() { await this.shadowDomLink.click(); }
    async shadowButtonClick() { await this.page.locator("button").click(); }

    // Navigate to Slider section
    async navigatetoSlider() { await this.ratingSlider.click(); }

    // Move slider until feedback button appears
    async moveSliderUntilFeedbackVisible() {
        for (let value = 0; value <= 100; value++) {
            await this.sliderInput.evaluate((el, val) => {
                const input = el as HTMLInputElement;
                input.value = val.toString();
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }, value);

            if (await this.sendFeedbackButton.isVisible()) {
                break;
            }
        }
        await this.page.locator('#feedback').click();
    }

    // Navigate to Download File section
    async navtodownloadfile() { await this.downloadFileLink.click(); }

    // Download file and validate
    async downloadFile() {
        const [download] = await Promise.all([
            this.page.waitForEvent("download"),
            this.page.locator("//a[@id='file']").click(),
        ]);

        const filePath = path.resolve(
            __dirname,
            "..",
            "testd",
            await download.suggestedFilename()
        );
        await download.saveAs(filePath);
        expect(fs.existsSync(filePath)).toBeTruthy();
        expect(path.extname(filePath)).toBe(".pdf");
    }
}
