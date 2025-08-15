// models/Robot.js
import mongoose from 'mongoose';

const robotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'AgriBot Rover'
  },
  status: {
    type: String,
    enum: ['inactive', 'waiting', 'active', 'charging'],
    default: 'inactive'
  },
  location: {
    latitude: { type: Number, required: true, default: 0 },
    longitude: { type: Number, required: true, default: 0 }
  },
  battery: {
    level: { type: Number, min: 0, max: 100, default: 100 },
    charging: { type: Boolean, default: false }
  },
  sensors: {
    temperature: { type: Number, default: null },
    humidity: { type: Number, default: null },
    soilMoisture: { type: Number, default: null }
  },
  tasks: [{
    taskType: { type: String, enum: ['move', 'harvest', 'scan'], required: true },
    target: { type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'done'], default: 'pending' },
    assignedAt: { type: Date, default: Date.now },
    completedAt: { type: Date }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Auto-update lastUpdated before saving
robotSchema.pre('save', function(next) {
  this.lastUpdated = Date.now();
  next();
});

export default mongoose.model('Robot', robotSchema);
``