import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as uuid from 'uuid';
import { HydratedDocument } from 'mongoose';
import { hash, genSaltSync } from 'bcryptjs';
import { Role } from '../enums/role.enum';
export type AccountDocument = HydratedDocument<Account>;

@Schema({
  collation: { locale: 'vi' },
	collection: 'Accounts'
})
export class Account{
  @Prop({
    type: String,
    default: () => uuid.v4(), // sẽ thay thế ObjectId mặc định
  })
  _id: string;

  @Prop({required: true})
  username: string;

  @Prop({required: true})
  password: string;

  @Prop({ type: String, enum: Role, default: Role.Customer })
  role: Role;

  @Prop({default: () => new Date()})
  createdAt: Date;

  @Prop({default: true})
  isActive: boolean;

  @Prop({required: true})
  customer_id: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

export const AccountProvider = {
	name: Account.name,
	useFactory: () => {
		const schema = AccountSchema;

		schema.pre<AccountDocument>('save', async function (next: any) {
			const schema = this;
			schema.password = await hash(schema.password, genSaltSync(10));
			next();
		});

		return schema;
	},
};