import Recaptcha from 'recaptcha-verify';
import { secretTokens } from '~/config/tokens';

/**
 * Validate a recaptcha token
 * @function recaptchaValidate
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @return {string} The response
 */
export const recaptchaValidate = (req, res) => {
  const recaptcha = new Recaptcha({
    secret: secretTokens.GOOGLE_RECAPTCHA_PRIVATE_TOKEN,
    varbose: true,
  });
  const userResponse = req.query['g-recaptcha-response'];

  recaptcha.checkResponse(userResponse, (error, response) => {
    if (error) {
      res.status(400).render('400', {
        message: error.toString(),
      });
      return;
    }
    if (response.success) {
      res.status(200).send('the user is a HUMAN :)');
    } else {
      res.status(200).send('the user is a ROBOT :(');
    }
  });
};
