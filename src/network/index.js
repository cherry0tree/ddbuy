import request from './request'

// 1. 定义基础路径
const BASE_URL = 'http://api.7-orange.cn:7300/mock/5def6a2d448e330a1116366e/api/'

/*****Home 模块*******/
export const getHomeData = () => request(BASE_URL + 'homeApi');

/***** 分类(Category) 模块 *******/
// Category 列表页面数据
export const getCategoryData = () => request(BASE_URL + 'homeApi/categories');

// Category 右边内容页面数据 需要根据左边点击传值
export const getCategoryDetailData = (params) => request(BASE_URL + 'homeApi/categoriesdetail' + params);

//吃什么模块
export const getTodayMenuCategoryList = () => request(BASE_URL + 'recipe/allScene');
export const getTodayMenuDetail = (params) => request(BASE_URL + 'recipe/menulist' + params);

//登录模块
export const getPhoneCaptcha = () => request(BASE_URL + 'send_code')

// Easy Mock 模拟用户登录
export const phoneCaptchaLogin = (phone, captcha) => request(BASE_URL + 'login_code', {
  phone,
  captcha
}, 'POST');

/***** 购物车页面 猜你喜欢*********/
export const getGuessYouLike = () => request(BASE_URL + 'cart/youlike');