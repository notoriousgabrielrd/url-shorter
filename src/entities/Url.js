// src/entities/Url.js

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from './User.js';
  
  @Entity()
  export class Url {
    @PrimaryGeneratedColumn()
    id;
  
    @Column()
    originalUrl;
  
    @Column({ unique: true })
    shortUrl;
  
    @Column({ default: 0 })
    clicks;
  
    @Column({ nullable: true })
    deletedAt;
  
    @ManyToOne(() => User, (user) => user.urls, { nullable: true })
    user;
  
    @CreateDateColumn()
    createdAt;
  
    @UpdateDateColumn()
    updatedAt;
}
  