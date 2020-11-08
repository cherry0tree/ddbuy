import {USER_INFO} from './mutation-type'

export default {
  //1.同步用户信息
  syncuserInfo({commit}, userInfo) {
    commit(USER_INFO, {userInfo})
  }
}