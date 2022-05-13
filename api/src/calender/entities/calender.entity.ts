import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('calender')
export class Calender {
  @PrimaryGeneratedColumn({
    comment: 'カレンダーID(id)',
  })
  readonly id: number;

  @Column('varchar', { nullable: true, comment: '名前' })
  person: string;

  @Column('varchar', { nullable: true, comment: '日付' })
  CDate: string;

  constructor(person: string) {
    this.person = person;
  }
}
