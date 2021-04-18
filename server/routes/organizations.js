import express from 'express';
import { getOrganizations, createOrganization, getOrganization } from '../controllers/organizations.js';

const router = express.Router();

router.get('/', getOrganizations);
router.post('/', createOrganization);
router.get("/:id", getOrganization);

export default router;