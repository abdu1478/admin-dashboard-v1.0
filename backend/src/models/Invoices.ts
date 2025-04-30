import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
  id: number;
  customer: string;
  issueDate: Date;
  dueDate: Date;
  amount: number;
  status: string;
}

const InvoiceSchema = new Schema<IInvoice>({
  id:         { type: Number, required: true, unique: true },
  customer:   { type: String, required: true },
  issueDate:  { type: Date,   required: true },
  dueDate:    { type: Date,   required: true },
  amount:     { type: Number, required: true },
  status:     { type: String, required: true },
}, {
  timestamps: true,  // adds createdAt/updatedAt if you want
});

// third arg “invoices” forces the collection name to “invoices”
export default mongoose.model<IInvoice>(
  'Invoice',
  InvoiceSchema,
  'invoices'
);
