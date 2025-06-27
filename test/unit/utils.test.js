import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import * as rateLimitModule from 'express-rate-limit';

import { logAIAction } from '../../src/utils/logger.js';
import { createCustomLimiter } from '../../src/utils/rateLimiter.js';
import supabase from '../../src/utils/supabaseClient.js';

describe('logAIAction', () => {
  const logsPath = path.resolve('logs');
  const logFile = path.join(logsPath, 'ai_logs.json');
  let existsSyncStub, readFileSyncStub, writeFileSyncStub;

  beforeEach(() => {
    existsSyncStub = sinon.stub(fs, 'existsSync');
    readFileSyncStub = sinon.stub(fs, 'readFileSync');
    writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should append a new log entry to ai_logs.json', () => {
    existsSyncStub.withArgs(logsPath).returns(true);
    existsSyncStub.withArgs(logFile).returns(true);
    readFileSyncStub.returns('[]');
    logAIAction({ action: 'test' });
    expect(writeFileSyncStub.calledOnce).to.be.true;
    const [file, data] = writeFileSyncStub.firstCall.args;
    expect(file).to.equal(logFile);
    const logs = JSON.parse(data);
    expect(logs).to.be.an('array');
    expect(logs[0]).to.include({ action: 'test' });
    expect(logs[0]).to.have.property('timestamp');
  });
});

describe('createCustomLimiter', () => {
  it('should return a middleware function', () => {
    const limiter = createCustomLimiter(1000, 2);
    expect(limiter).to.be.a('function');
  });
});

describe('supabase client', () => {
  it('should have auth and from methods', () => {
    expect(supabase).to.have.property('auth');
    expect(supabase).to.have.property('from');
  });
  it('should allow calling mock auth methods', async () => {
    const user = await supabase.auth.getUser();
    expect(user).to.have.property('data');
    expect(user).to.have.property('error');
  });
  it('should allow calling mock from methods', async () => {
    const table = supabase.from('test');
    const res = await table.select();
    expect(res).to.have.property('data');
    expect(res).to.have.property('error');
  });
}); 