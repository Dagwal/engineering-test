// CommentModel.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BookingModel } from './booking.model';

@Entity({ name: 'comments' })
export class CommentModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  commentText!: string;

  @ManyToOne(() => BookingModel, booking => booking.comments)
  @JoinColumn({ name: 'bookingId' })
  booking!: BookingModel;
}
