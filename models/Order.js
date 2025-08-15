import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_code: {
    type: String,
    required: true,
    unique: true
  },
  robot_id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Robot'
  }],
  num_robot: {
    type: Number,
    default: 0
  },
  client_name: {
    type: String,
    required: true
  },
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  task_type: {
    type: String,
    enum: ['harvest', 'scan', 'transport'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  location: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null }
  },
  start_time: { type: Date },
  end_time: { type: Date },
  notes: { type: String },
  priority: { type: Number, default: 3 }, // 1 = high, 5 = low
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  last_updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
