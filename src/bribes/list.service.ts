/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { NumberList } from './interfaces/number-list.dto';
import { List } from './list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) { }

  isConsecutive(arr: number[]) {
    const sorted = [...arr].sort((a, b) => a - b);
    const differenceAry = sorted.slice(1).map(function (n, i) { return n - sorted[i]; })
    return differenceAry.every(value => value == 1)
  };

  getBribes(q: number[]): number {
    if (!this.isConsecutive(q)) throw new Error("Array should be consecutive");
    const bribes = q.map((item, i) => {
      const diff = Math.abs(i - (item - 1));
      if (diff > 2) throw new Error("Too chaotic");
      return diff;
    });
    const bribesSum = bribes.reduce((pre, current) => (pre + current), 0);
    return bribesSum / 2;
  };

  saveList({ q, result }: NumberList): Promise<List> {
    const res = this.getBribes(q);
    if (`${res}` !== result) {
      throw new HttpException('You are trying to add list with wrong result', HttpStatus.NOT_ACCEPTABLE);
    }
    return this.listRepository.save({ q: q.join(", "), result })
  };

  getAllList(): Promise<List[]> {
    return this.listRepository.find();
  };

  getList(id?: string): Promise<List> {
    return this.listRepository.findOne(id);
  };

  patchList(id: string, { q, result }: NumberList): Promise<UpdateResult> {
    return this.listRepository.update(id, { q: q.join(", "), result });
  };

  deleteList(id?: string): Promise<DeleteResult> {
    return this.listRepository.delete(id);
  };
}
