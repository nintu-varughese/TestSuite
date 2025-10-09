import { test as base, expect } from '@playwright/test';
import custom from './CustomTasks'
import playg from './Qaplaytasks'
import { userInfo } from 'os';

type MyFixtures = {
  custom:custom
  playg:playg
  
};

const test = base.extend<MyFixtures>({
        custom:async({page},use)=>
        {
          await use(new custom(page))
        },
        playg:async({page},use)=>
        {
          await use(new playg(page))
        }

});


export { test, expect };
