import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, PersistedEntityNotFoundError, Repository } from 'typeorm';
import { CreateCalenderDto } from './dto/create-calender.dto';
import { UpdateCalenderDto } from './dto/update-calender.dto';
import { Calender } from './entities/calender.entity';

@Injectable()
export class CalenderService {
  constructor(
    @InjectRepository(Calender) private calenderRepository: Repository<Calender>,
  ) {}

  async create(CreateCalenderDto: CreateCalenderDto): Promise<{ message: string }> {
    const calender = await this.calenderRepository
      .save({
        person: CreateCalenderDto.person,
        CDate: CreateCalenderDto.CDate,
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          `[${e.message}] 登録に失敗しました。`,
        );
      });

      return { message: '登録に成功しました。' };
  }

  async findAll(): Promise<Calender[]> {
    // return await this.calenderRepository.find();
    const sql = `
    WITH RECURSIVE daily(calendar_date) AS (
      SELECT
          -- ここに始まりの日付を指定する
          DATE('now','-1 day') AS calendar_date
      UNION ALL
      -- UNION ALL 以下が再帰処理部分
      SELECT
          DATE(calendar_date, '+1 day') AS calendar_date
      FROM daily
      WHERE
          -- ここに終わりの日付を指定する
          calendar_date < DATE('now', '+30 day')
  )
  -- ここが実際のSELECT文
  SELECT 
      calendar_date,
      c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,
      c11,c12,c13,c14
  FROM daily
  LEFT JOIN (SELECT CDate,'●' as c1 FROM calender WHERE person = '山口') AS a on a.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c2 FROM calender WHERE person = '池内') AS b on b.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c3 FROM calender WHERE person = '横田') AS c on c.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c4 FROM calender WHERE person = '越智') AS d on d.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c5 FROM calender WHERE person = '加美台') AS e on e.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c6 FROM calender WHERE person = '分田') AS f on f.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c7 FROM calender WHERE person = '片山') AS g on g.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c8 FROM calender WHERE person = '加島') AS h on h.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c9 FROM calender WHERE person = '大年') AS i on i.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c10 FROM calender WHERE person = '森') AS j on j.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c11 FROM calender WHERE person = '河村') AS k on k.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c12 FROM calender WHERE person = '澤村') AS l on l.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c13 FROM calender WHERE person = '橋本') AS m on m.CDate = calendar_date
  LEFT JOIN (SELECT CDate,'●' as c14 FROM calender WHERE person = '森川') AS n on n.CDate = calendar_date
  ;
`;

    return await this.calenderRepository.query(sql);
  }

  async persons(): Promise<String[]> {

    const calenders = await getRepository(Calender)
      .createQueryBuilder("calender")
      .groupBy('person')
      .orderBy('person')
      .getMany();
    
    const persons: string[] = calenders.map((calender: Calender) => {
      return calender.person;
    });

    return persons;
  }

  findOne(id: number) {
    return `This action returns a #${id} calender`;
  }

  update(id: number, updateCalenderDto: UpdateCalenderDto) {
    return `This action updates a #${id} calender`;
  }

  async remove(person: string, CDate: string){
    return await this.calenderRepository.delete({person: `${person}`, CDate: `${CDate}`})
  }
}
