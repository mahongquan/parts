import { getUsefulContents } from './file.js';

getUsefulContents('http://www.baidu.com',
    data => { doSomethingUseful(data); });