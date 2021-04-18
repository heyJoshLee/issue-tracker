import mongoose from 'mongoose';

const organizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const organization = mongoose.model('Organization', organizationSchema);
export default organization;