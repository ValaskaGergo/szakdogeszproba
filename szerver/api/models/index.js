const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;
  const slotSchema = new Schema ({
    slot_time: String,
    slot_date: String,
    created_at: Date
});
const Slot = model('Slot', slotSchema);

const appointmentSchema = new Schema({
  id: ObjectId,
  day_of_week: Number,
  start_date: String,
  length: Number,
  status: String
});
const Appointment = model('Appointment', appointmentSchema);

const bookingSchema = new Schema({
  id: ObjectId,
  day: String,
  time: String,
  service_name: String,
  name: String,
  phone: String,
  email: String,
  length: Number,
  status: String
});
const Booking = model('Booking', bookingSchema);

const userSchema = new Schema({
  id: ObjectId,
  username: String,
  password: String,
});
const User = model('User', userSchema);

const serviceSchema = new Schema({
  id: ObjectId,
  name: String,
  length: Number,
});
const Service = model('Service', serviceSchema);

const freeDaySchema = new Schema({
  id: ObjectId,
  day: String,
  length: Number,
});
const FreeDay = model('FreeDay', freeDaySchema);


module.exports = {Appointment, Slot, User, Service, Booking, FreeDay};