/* eslint-disable prettier/prettier */
import { List } from './list.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ListDto } from './interfaces/list.dto';

@EntityRepository(List)
export class ListRepository extends Repository<List> {
    createList = async (listDto: ListDto) => {
        return await this.save(listDto);
    };
}