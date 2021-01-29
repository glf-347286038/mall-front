// 分封装模块 使用localStorage实现持久化 只是进行保存
// 从localStorage中取出一项数据 名字叫item
export const getItem = item => {
    return localStorage.getItem(item);
}
// 设置一条数据
export const setItem = (name,value) =>{
    localStorage.setItem(name,value)
}

// 删除
export const removeItem = name =>{
    localStorage.removeItem(name)
}
