const getters = {
  token: state => state.user.token,
  topMenus: state => state.user.topMenus,
  //按钮权限
  permission:state =>state.user.permissionList,
  CustomFilter: state =>state.user.CustomFilter
};
export default getters
