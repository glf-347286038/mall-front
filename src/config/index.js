// 当前环境
const environment = process.env["VUE_APP_NODE_ENV "];
const userServiceName = '/mall-user-dev';
const orderServiceName = '/mall-order';
const productServiceName = '/mall-product-dev';

const publicUrl = {
    mall_user:process.env.VUE_APP_BASE_URL+userServiceName,
    mall_order:process.env.VUE_APP_BASE_URL+orderServiceName,
    mall_product:process.env.VUE_APP_BASE_URL+productServiceName,
}
export default publicUrl