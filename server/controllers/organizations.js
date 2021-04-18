import Organization from '../models/organization.js'

export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    console.log("GET ORGANIZATIONS")
    res.status(200).json(organizations)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const createOrganization = async (req, res) => {
  const organization = req.body;
  const newOrganization = new Organization(organization);
  try {
    await newOrganization.save();
    console.log("SAVED")
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getOrganization = async (req, res) => {
  const id = req.params.id
  console.log(req.params)
  try {
    const organization = await Organization.findById(id);
    res.status(201).json(organization);
  } catch (error) {
    res.status(404).json({ message: error.message});
  }

}