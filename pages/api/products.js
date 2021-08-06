// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from '@sentry/nextjs';
import productsData from '../../src/constants/products.json';

const handler = async (req, res)  => {
  const userName = req.query['userName'];

  // Set 5 product as fav
  if (userName === 'fav_user') {
    const products = productsData.products;
    const favProducts =  products.slice(0, 5).map((product) => product.isFav = true);
    res.statusCode = 200;
    res.json({ products: products.map(itm => ({
      ...favProducts.find((item) => (item.id === itm.id) && item),
      ...itm
    }))});
  } else {
    const products = productsData.products;
    products.map(product => product.isFav = false);
    res.statusCode = 200;
    res.json(productsData);
  }
};

export default withSentry(handler);
