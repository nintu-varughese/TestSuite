import { test as base, expect } from "@playwright/test";
import custom from "./CustomTasks";
import playg from "./Qaplaytasks";
import scre from "./screenerPage";

type MyFixtures = {
  custom: custom;
  playg: playg;
  scre: scre;
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
});

export { test, expect };
