import { request } from '@/plugins/request';

//发布文章
const publicArticle = data => {
  return request ({
    method: 'Post',
    url: `/api/articles`,
    data
  });
}

//修改已经发布过的文章
const updateArticle = (slug, data)=> {
  return request ({
    method: 'Put',
    url: `/api/articles/${slug}`,
    data
  });
}

//根据slug获取文章详情
const getArticle = slug => {
  return request ({
    method: 'Get',
    url: `/api/articles/${slug}`
  });
}

//获取公共文章接口
const getArticles = params => {
  return request ({
    method: 'Get',
    url: '/api/articles',
    params
  });
}

//获取用户已关注的文章列表
const getFeedArticles = params => {
  return request ({
    method: 'Get',
    url: '/api/articles/feed',
    params
  });
}

//点赞
const addFavoriteArticle = slug => {
  return request ({
    method: 'Post',
    url: `/api/articles/${slug}/favorite`
  });
}

//取消点赞
const deleteFavoriteArticle = slug => {
  return request ({
    method: 'Delete',
    url: `/api/articles/${slug}/favorite`
  });
}

//获取文章详情
const getArticleDetails = slug => {
  return request ({
    method: 'Get',
    url: `/api/articles/${slug}`
  });
}

//获取文章评论
const getArticleComments= slug => {
  return request ({
    method: 'Get',
    url: `/api/articles/${slug}/comments`
  });
}

export {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
  publicArticle,
  updateArticle,
  getArticle,
  getArticles, 
  getFeedArticles, 
  addFavoriteArticle, 
  deleteFavoriteArticle,
  getArticleDetails,
  getArticleComments
}