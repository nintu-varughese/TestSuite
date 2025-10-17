import { test as base, expect } from "@playwright/test";
import custom from "./CustomTasks";
import playg from "./Qaplaytasks";
import scre from "./screenerPage";
import Playgcolour from "./playGroundCol";
import DynamicTableExportPDFPage from "./DynamicTableExportPDFPage";
import StaticTablePDFPage from "./StaticTablePDFPage";
import StaticTablePage from "./staticPage";
import DynamicTableExportPage from "./dynamicPage";

type MyFixtures = {
  custom: custom;
  playg: playg;
  scre: scre;
  playgco:Playgcolour
  pdfPage:DynamicTableExportPDFPage
  pdfPageE:StaticTablePDFPage
  staticTablePage:StaticTablePage
  tablePage:DynamicTableExportPage
};

const test = base.extend<MyFixtures>({
  custom: async ({ page }, use) => {
    await use(new custom(page));
  },
  playg: async ({ page }, use) => {
    await use(new playg(page));
  },
  scre: async ({ page }, use) => {
    await use(new scre(page));
  },
  playgco:async({page},use)=>{
    await use(new Playgcolour(page))
  },
  pdfPage:async({page},use)=>
  {
    await use(new DynamicTableExportPDFPage(page))
  },
  pdfPageE:async({page},use)=>
  {
    await use(new StaticTablePDFPage(page))
  },
  staticTablePage:async({page},use)=>
  {
    await use(new StaticTablePage(page))
  },
  tablePage:async({page},use)=>
  {
    await use(new DynamicTableExportPage(page))
  }
});

export { test, expect };
