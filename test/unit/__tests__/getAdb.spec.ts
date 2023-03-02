// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { ADB } from 'appium-adb';
import AndroidDeviceManager from '../../../src/device-managers/AndroidDeviceManager';

jest.mock('appium-adb'); // Mock the ADB library

describe('MyClass', () => {
  let androidDeviceManager;

  beforeEach(() => {
    androidDeviceManager = new AndroidDeviceManager();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAdb()', () => {
    it('should create an ADB instance if one does not exist', async () => {
      const mockAdbInstance = {};
      ADB.createADB.mockResolvedValueOnce(mockAdbInstance); // Mock the createADB function to return a dummy instance

      const result = await androidDeviceManager.getAdb();

      expect(result).toEqual(mockAdbInstance);
      expect(ADB.createADB).toHaveBeenCalled();
    });

    it('should return the existing ADB instance if one already exists', async () => {
      const mockAdbInstance = {};
      androidDeviceManager.adb = mockAdbInstance;

      const result = await androidDeviceManager.getAdb();

      expect(result).toEqual(mockAdbInstance);
      expect(ADB.createADB).not.toHaveBeenCalled();
    });

    it('should set adbAvailable to false if there is an error creating an ADB instance', async () => {
      ADB.createADB.mockRejectedValueOnce(new Error('Could not create ADB instance'));

      await androidDeviceManager.getAdb();

      expect(androidDeviceManager.adbAvailable).toBe(false);
    });
  });
});
