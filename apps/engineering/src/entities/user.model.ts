import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookingModel } from './booking.model';

export interface User {
  id?: string;
  name: string;
  email: string;
}

@Entity({ name: 'users'})
export class UserModel implements User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @OneToMany(() => BookingModel, booking => booking.user)
  bookings!: BookingModel[];
}
