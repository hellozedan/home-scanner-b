import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import homeCtrl from '../controllers/home.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/domains - Create new domain */
  .post(validate(paramValidation.createHome), homeCtrl.create);

router.route('/:homeNumber')
  /** GET /api/domains/:domainId - Get domain */
  .get(homeCtrl.get);

/** Load domain when API with domainId route parameter is hit */
router.param('domainId', homeCtrl.load);

export default router;
