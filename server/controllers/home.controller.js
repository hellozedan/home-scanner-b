import httpStatus from 'http-status';
import Home from '../models/home.model';
import APIError from '../helpers/APIError';

/**
 * Load domain and append to req.
 */
function load(req, res, next, id) {
  Home.findOne({ homeNumber: id })
    .then((home) => {
      if (!home) {
        const err = new APIError('Not Found', httpStatus.NOT_FOUND, true);
        return next(err);
      }

      req.home = home; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get domain
 * @returns {Domain}
 */
function get(req, res) {
  return res.json(req.home);
}

/**
 * Create new domain
 * @property {string} req.body.domainName - The domainName of domain.
 * @property {string} req.body.mobileNumber - The mobileNumber of domain.
 * @returns {Domain}
 */
function create(req, res, next) {
  console.log('bbb')
  const home = new Home({
    homeNumber: req.body.homeNumber,
    homeAddress: req.body.homeAddress
  });

  home.save()
    .then(savedHome => res.json(savedHome))
    .catch(e => next(e));
}


export default { load, get, create};
