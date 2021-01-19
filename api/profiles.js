import { request } from '@/plugins/request';

//根据用户名获取用户详情
const getProfiles = username => {
  return request ({
    method: 'Get',
    url: `/api/profiles/${username}`
  });
}


export { getProfiles }