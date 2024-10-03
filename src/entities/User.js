// src/entities/User.js

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Url } from './Url.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id;

  @Column({ unique: true })
  email;

  @Column()
  password;

  @Column({ nullable: true })
  deletedAt;

  @OneToMany(() => Url, (url) => url.user)
  urls;
}
