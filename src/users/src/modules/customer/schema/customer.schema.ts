import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as uuid from 'uuid';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;
@Schema({
  collation: { locale: 'vi' },
	collection: 'Customers'
})
export class Customer {
  @Prop({
    type: String,
    default: () => uuid.v4(), 
  })
  _id: string;

  @Prop({require: true})
  fullName: string;

  @Prop()
  age: number;

  @Prop({maxLength: 11})
  phone: string;

  @Prop()
  address: string;

  @Prop({ name: "created_at", default: () => new Date() })
  createdAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

export const CustomerProvider = {
	name: Customer.name,
	useFactory: () => {
		const schema = CustomerSchema;
		schema.pre<CustomerDocument>('save', async function (next: any) {
			const schema = this;
			next();
		});
		return schema;
	},
};