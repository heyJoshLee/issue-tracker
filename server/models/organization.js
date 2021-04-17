import mongoose from 'mongoose';

const organizationSchema = mongoose.Schema({
  name: String
});

const organization = mongoose.model('Organization', organizationSchema);
export default organization;