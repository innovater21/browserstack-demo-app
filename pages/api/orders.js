// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from '@sentry/nextjs';
import ordersData from '../../src/constants/orders.json';

const handler = async (req, res)  => {
  const userName = req.query['userName'];
  
  // Set 5 product as fav
  if (userName === 'existing_orders_user') {
    const orders = ordersData.orders
    res.statusCode = 200;
    res.json({ orders });
  } else {
    res.statusCode = 404;
    res.json({ message: 'No orders found' });
  }
};

export default withSentry(handler);

