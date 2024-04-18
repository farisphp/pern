import { Migration } from '@mikro-orm/migrations';

export class Migration20240417200650 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null default gen_random_uuid(), "full_name" varchar(255) not null, "email" varchar(255) not null, "username" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, constraint "user_pkey" primary key ("id"));');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('create index "user_deleted_at_index" on "user" ("deleted_at");');
  }

}
