// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from '@sentry/nextjs';

import { isValidUser, isValidPassword, isLockedUser } from '../../src/constants/users';

const handler = async (req, res)  => {
  const userName = req.body['userName'];
  const password = req.body['password'];
  if (isValidUser(userName) && isValidPassword(password)) {
    res.statusCode = 200;
    res.json({});
  } else {
    let errorMessage = '';
    if (!isValidUser(userName)) {
      errorMessage = 'Invalid Username';
    } else if (!isValidPassword(password)) {
      errorMessage = 'Invalid Password';
    } else {
      errorMessage = 'Something went wrong';
    }

    if (isLockedUser(userName)) {
      errorMessage = 'Your account has been locked.'
    }
    
    res.statusCode = 422;
    res.json({ errorMessage });
  }
};

export default withSentry(handler);
