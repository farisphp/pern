import { Entity, Property, PrimaryKey, Index } from '@mikro-orm/core';

import WithSoftDelete from '../../utils/soft-delete';

@Entity()
@WithSoftDelete()
class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  fullName!: string;

  @Property({ unique: true })
  uid!: string;

  @Property({ unique: true })
  email!: string;

  @Property({ unique: true })
  username!: string;

  @Property()
  lastLoginAt = new Date();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Index()
  @Property({ nullable: true, type: 'timestamptz' })
  deletedAt?: Date;
}

export default User;
