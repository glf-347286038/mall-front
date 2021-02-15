// 当前环境
const environment = process.env["VUE_APP_NODE_ENV "];
const userServiceName = '/mall-user';
const orderServiceName = '/mall-order';

const publicUrl = {
    mall_user:process.env.VUE_APP_BASE_URL+userServiceName,
    mall_order:process.env.VUE_APP_BASE_URL+orderServiceName,
}
export default publicUrl