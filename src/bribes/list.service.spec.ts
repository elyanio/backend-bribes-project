/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';
import { ListService } from './list.service';

describe('list service module', () => {
  let listService: ListService;

  beforeEach(async () => {
    const modules: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [ListService, {
        provide: "ListRepository",
        useValue: {}
      }],
    }).compile();

    listService = modules.get<ListService>(ListService);
  });

  describe('list module', () => {
    it('should return 0 bribes with an empty []', () => {
      const q = [];
      expect(listService.getBribes(q)).toBe(0);
    });

    it('should return 0 bribes with a correct array', () => {
      const q = [1, 2, 3, 4];
      expect(listService.getBribes(q)).toBe(0);
    });

    it('should return error with message "Too chaotic" with a very unsorted array', () => {
      const q = [4, 2, 3, 1];
      const errorFn = () => listService.getBribes(q);
      expect(errorFn).toThrowError(new Error("Too chaotic"));
    });
    it('should return error with message "Array should be consecutive" with not consecutive array', () => {
      const q = [1, 2, 3, 5];
      const errorFn = () => listService.getBribes(q);
      expect(errorFn).toThrowError(new Error("Array should be consecutive"));
    });
    it('should return 1 with a one bribes in the array', () => {
      const q = [1, 2, 3, 5, 4, 6, 7, 8, 9];
      expect(listService.getBribes(q)).toBe(1);
    });
    it('should return true with a consecutive array', () => {
      const q = [1, 2, 3, 5, 4, 6, 7, 8, 9];
      expect(listService.isConsecutive(q)).toBe(true);
    });
    it('should return true with a not consecutive array', () => {
      const q = [1, 2, 3, 5, 4, 7, 8, 9];
      expect(listService.isConsecutive(q)).toBe(false);
    });
  });
});
