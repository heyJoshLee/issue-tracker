import Organization from '../models/organization.js'

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    console.log(organizations);
    res.status(200).json(organizations)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createOrganization = async (req, res) => {
  const organization = req.body;
  console.log(req.body)
  const newOrganization = new Organization(organization);
  try {
    await newOrganization.save();
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}