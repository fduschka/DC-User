#!/usr/bin/env node

import Runner from './handlers/runner.js';


const runner = new Runner();
runner.run();

process.on("unhandledRejection", async (err, promise) => { });