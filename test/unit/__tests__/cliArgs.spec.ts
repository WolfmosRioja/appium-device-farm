import { addCLIArgs, getCLIArgs } from '../../../src/data-service/pluginArgs';

describe('CLIArgs functions', () => {
  test('addCLIArgs adds new CLI arguments', async () => {
    const args = { arg1: 'value1', arg2: 'value2' };
    await addCLIArgs(args);
    const cliArgs = getCLIArgs();
    expect(cliArgs).toBeTruthy();
  });

  test('getCLIArgs returns an array of all CLI arguments', async () => {
    const args1 = { arg1: 'value1', arg2: 'value2' };
    const args2 = { arg1: 'value3', arg2: 'value4' };
    await addCLIArgs(args1);
    await addCLIArgs(args2);
    const cliArgs = getCLIArgs();
    expect(cliArgs).toContainEqual(args1);
    expect(cliArgs).toContainEqual(args2);
  });
});
