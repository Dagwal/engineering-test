import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Parc, ParcModel } from './parc.model';
import { UserModel } from './user.model';
import { CommentModel } from './comment.model';

export interface Booking {
  id?: string;
  user: UserModel;
  parc: Parc;
  bookingdate: string;
  comments?: CommentModel[];
}

@Entity({ name: 'bookings' })
export class BookingModel implements Booking{
  @PrimaryColumn()
  id!: string;

  @ManyToOne(() => UserModel, user => user.bookings)
  user!: UserModel;

  @ManyToOne(() => ParcModel, parc => parc.bookings)
  parc!: ParcModel;

  @Column()
  bookingdate!: string;

  @OneToMany(() => CommentModel, comment => comment.booking)
  comments!: CommentModel[];
}
