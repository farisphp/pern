import { Migration } from '@mikro-orm/migrations';

export class Migration20240417191154 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "full_name" varchar(255) not null, "email" varchar(255) not null, "username" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('create index "user_deleted_at_index" on "user" ("deleted_at");');
  }

}
