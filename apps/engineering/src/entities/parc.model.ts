import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookingModel } from './booking.model';

export interface Parc {
  id?: string;
  name: string;
  description: string;
}

@Entity({ name: 'parcs' })
export class ParcModel  {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => BookingModel, booking => booking.parc)
  bookings?: BookingModel[];
}
