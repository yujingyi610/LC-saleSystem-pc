import axios from "@/axios/api.js"

// 字典条目 列表
export function dictionaryEntryList(params){
  return axios.service({
    url: `/api/sys/dict/item/listPage`,
    method: 'get',
    params,
  })
}

// 字典条目 搜索 类型下拉框
export function dictionaryEntrySearchOptions(params){
  return axios.service({
    url: `/api/sys/dict/type/listAll`,
    method: 'get',
    params,
  })
}

// 字典条目 新增or修改
export function dictionaryEntryAddOrEdit(data){
  return axios.service({
    url:  `/api/sys/dict/item/saveOrUpdate`,
    method: 'post',
    data,
  })
}

// 字典条目 删除
export function dictionaryEntryDelete(data){
  return axios.service({
    url: `/api/sys/dict/item/delete/${data.id}`,
    method: 'post',
  })
}

// 字典类型 列表
export function dictionaryTypeList(params){
  return axios.service({
    url: `/api/sys/dict/type/listPage`,
    method: 'get',
    params,
  })
}

// 字典类型 新增or修改
export function dictionaryTypeAddOrEdit(data){
  return axios.service({
    url: `/api/sys/dict/type/saveOrUpdate`,
    method: 'post',
    data,
  })
}

// 字典类型 删除
export function dictionaryTypeDelete(data){
  return axios.service({
    url: `/api/sys/dict/type/delete/${data.id}`,
    method: 'post',
  })
}

// 用户管理 列表
export function userManagementList(params){
  return axios.service({
    url: `/api/sys/user/listPage`,
    method: 'get',
    params,
  })
}

// 用户管理 获取所有角色
export function userManagementAllRole(params){
  return axios.service({
    url: `/api/sys/role/list`,
    method: 'get',
    params,
  })
}

// 用户管理 根据用户获取角色
export function userManagementUserRole(params){
  return axios.service({
    url: `/api/sys/userRole/list`,
    method: 'get',
    params,
  })
}

// 用户管理 保存角色
export function userManagementSaveRole(data){
  return axios.service({
    url: `/api/sys/userRole/saveOrUpdate`,
    method: 'post',
    params : data,
  })
}

// 组织管理 左侧一级树
export function organizationAndMnagementOneTree(params){
  return axios.service({
    url: `/api/sys/orgUnit/tree`,
    method: 'get',
    params,
  })
}

// 组织管理 左侧 点击加载树
export function organizationAndMnagementloadingTree(params){
  return axios.service({
    url: `/api/sys/orgUnit/tree`,
    method: 'get',
    params,
  })
}

// 组织管理 用户列表
export function organizationAndMnagementList(params){
  return axios.service({
    url: `/api/sys/user/list`,
    method: 'get',
    params,
  })
}

// 角色管理 列表
export function roleManagementList(params){
  return axios.service({
    url: `/api/sys/role/listPage`,
    method: 'get',
    params,
  })
}

// 角色管理 新增or修改
export function roleManagementAddOrEdit(data){
  return axios.service({
    url: `/api/sys/role/saveOrUpdateRole`,
    method: 'post',
    data,
  })
}

// 角色管理 禁用or启用
export function roleManagementDisableOrEnable(data){
  return axios.service({
    url: `/api/sys/role/changeStatus/${data.id}/${data.yn}`,
    method: 'post',
  })
}

// 角色管理 获取权限树
export function roleManagementJurisdictionTree(params){
  return axios.service({
    url: `/api/sys/menu/menuAndEleTree`,
    method: 'get',
    params,
  })
}

// 角色管理 根据角色获取权限
export function roleManagementJurisdictionRoleAuthority(data){
  return axios.service({
    url: `/api/sys/userRole/listPermissionByRoleId?roleId=${data.roleId}`,
    method: 'get',
  })
}

// 角色管理 保存权限
export function roleManagementJurisdictionSave(data){
  return axios.service({
    url: `/api/sys/userRole/savePermissionByRoleId?roleId=${data.roleId}`,
    method: 'post',
    data : data.data,
  })
}

// 菜单管理 菜单树
export function menuManagementTree(params){
  return axios.service({
    url: `/api/sys/menu/tree`,
    method: 'get',
    params,
  })
}

// 菜单管理 新增菜单
export function menuManagementAddMenu(data){
  return axios.service({
    url: `/api/sys/menu/save`,
    method: 'post',
    data,
  })
}

// 菜单管理 修改菜单
export function menuManagementEditMenu(data){
  return axios.service({
    url: `/api/sys/menu/update/${data.id}`,
    method: 'post',
    data,
  })
}

//菜单管理 删除菜单
export function menuManagementDeletemenu(data){
  return axios.service({
    url: `/api/sys/menu/delete/${data.id}`,
    method: 'post',
  })
}

// 菜单管理 按钮或资源列表
export function menuManagementBtnOrResourcesList(params){
  return axios.service({
    url: `/api/sys/element/list`,
    method: 'get',
    params,
  })
}

// 菜单管理 按钮或资源新增
export function menuManagementBtnOrResourcesAdd(data){
  return axios.service({
    url: `/api/sys/element/save`,
    method: 'post',
    data,
  })
}

// 菜单管理 按钮或资源修改
export function menuManagementBtnOrResourcesEdit(data){
  return axios.service({
    url: `/api/sys/element/update/${data.id}`,
    method: 'post',
    data,
  })
}

//菜单管理 按钮或资源删除
export function menuManagementBtnOrResourcesDelete(data){
  return axios.service({
    url: `/api/sys/element/delete/${data.id}`,
    method: 'post',
  })
}

// 任务管理 获取表信息
export function getscheduleJobVoList(){
  return axios.service({
    url: '/api/schedule/schedule/list-job',
    method: 'get',

  })
}

// 任务管理 系统中的任务 暂停
export function getPausejob(data){
  return axios.service({
    url: `/api/schedule/schedule/pause-job/?scheduleJobId=${data.scheduleJobId}`,
    method: 'post',
    data,
  })
}

// 任务管理 系统中的任务 恢复
export function getresumejob(data){
  return axios.service({
    url: `/api/schedule/schedule/resume-job/?scheduleJobId=${data.scheduleJobId}`,
    method: 'post',
    data,
  })
}

// 任务管理 系统中的任务 删除
export function getdelete(data){
  return axios.service({
    url: `/api/schedule/schedule/delete/?scheduleJobId=${data.scheduleJobId}`,
    method: 'post',
    data,
  })
}

// 任务管理 系统中的任务 运行一次
export function getrunoncejob(data){
  return axios.service({
    url: `/api/schedule/schedule/run-once-job/?scheduleJobId=${data.scheduleJobId}`,
    method: 'post',
    data,
  })
}

// 任务管理 系统中的任务 编辑保存
export function getKeepedit(data){
  return axios.service({
    url: '/api/schedule/schedule/save-job',
    method: 'post',
    data,
  })
}


///api/sys/role/saveOrUpdateRole
//角色增加新增
export function saveOrUpdateRole(data){
  return axios.service({
    url: 'api/sys/role/saveOrUpdateRole',
    method: 'post',
    data,
  })
}
