// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from '@sentry/nextjs';
import { isValidUser } from '../../src/constants/users';

const handler = async (req, res)  => {
  const userName = req.body['userName'];
  if (isValidUser(userName)) {
    res.statusCode = 200;
    res.json({});
  } else {    
    res.statusCode = 422;
    res.json({ });
  }
};

export default withSentry(handler);

