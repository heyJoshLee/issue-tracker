import express from 'express';
import { getOrganizations, createOrganization, getOrganization, deleteOrganization } from '../controllers/organizations.js';

const router = express.Router();

router.get('/', getOrganizations);
router.post('/', createOrganization);
router.get("/:id", getOrganization);
router.delete("/:id", deleteOrganization);

export default router;