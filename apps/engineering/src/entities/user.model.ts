import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BookingModel } from './booking.model';

export interface User {
  id?: string;
  name: string;
  email: string;
}

@Entity({ name: 'users'})
export class UserModel implements User {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @OneToMany(() => BookingModel, booking => booking.user)
  bookings!: BookingModel[];
}
