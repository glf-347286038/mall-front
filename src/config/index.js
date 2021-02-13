// 当前环境
const environment = process.env["VUE_APP_NODE_ENV "];
const userServiceName = '/mall-user-glf';
const orderServiceName = '/mall-order-glf';

const publicUrl = {
    mall_user:process.env.VUE_APP_BASE_URL+userServiceName,
    mall_order:process.env.VUE_APP_BASE_URL+orderServiceName,
}
export default publicUrl