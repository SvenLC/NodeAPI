const express = require('express');

const prospectController = require('../controllers/prospect');

const router = express.Router();

router.get('/:prospectId', prospectController.getProspect);
router.get('/', prospectController.getProspects);
router.get('/formated', prospectController.getProspectFormated);
router.post('/', prospectController.createProspect);
router.delete('/:prospectId', prospectController.deleteProspect);
router.put('/:prospectId', prospectController.updateProspect);

module.exports = router;