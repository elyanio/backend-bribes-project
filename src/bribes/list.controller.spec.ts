/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ListController } from './list.controller';
import { ListService } from './list.service';

describe('ListController', () => {
  let listController: ListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [ListService, {
        provide: "ListRepository",
        useValue: {}
      }],
    }).compile();

    listController = module.get<ListController>(ListController);
  });

  describe('list controller module', () => {
    it('should return 0 bribes with an empty []', () => {
      const list = { q: [], result: "0" };
      expect(listController.getBribes(list).bribes).toBe(0);
    });

    it('should return 0 bribes with a correct array', () => {
      const list = { q: [1, 2, 3, 4], result: "0" };
      expect(listController.getBribes(list).bribes).toBe(0);
    });

    it('should return "Too chaotic" message with a very unsorted array', () => {
      const list = { q: [4, 2, 3, 1], result: "Too chaotic" };
      expect(listController.getBribes(list).bribes).toBe("Too chaotic");
    });
    it('should return "Array should be consecutive" message with not consecutive array', () => {
      const list = { q: [1, 2, 3, 5], result: "0" };
      expect(listController.getBribes(list).bribes).toBe("Array should be consecutive");
    });
    it('should return 1 with a one bribes in the array', () => {
      const list = { q: [1, 2, 3, 5, 4, 6, 7, 8, 9], result: "1" };
      expect(listController.getBribes(list).bribes).toBe(1);
    });
  });
});
