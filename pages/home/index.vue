<template>
  <div>
    <div class="home-page">
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item" v-if="user">
                  <nuxt-link exact class="nav-link disabled" :class="{ active: tab === 'your_feed' }" :to="{
                    name: 'home',
                    query: {
                      tab: 'your_feed'
                    }
                  }">Your Feed</nuxt-link>
                </li>
                <li class="nav-item">
                  <nuxt-link exact class="nav-link" :class="{ active: tab === 'global_feed' }" :to="{
                    name: 'home',
                    query: {
                      tab: 'global_feed'
                    }
                  }">Global Feed</nuxt-link>
                </li>
                <li class="nav-item" v-if="tag">
                  <nuxt-link exact class="nav-link" :class="{ active: tab === 'tag' }" :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag
                    }
                  }">#{{ tag }}</nuxt-link>
                </li>
              </ul>
            </div>

            <div class="article-preview"
              v-for="article in articles" :key="article.slug">
              <div class="article-meta">
                <nuxt-link :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }">
                  <img :src="article.author.image"/>
                </nuxt-link>
                <div class="info">
                  <nuxt-link class="author" :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
                  }">
                    {{ article.author.username }}
                  </nuxt-link>
                  <span class="date">{{ article.createdAt | date('MMM DD，YYYY') }}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right" :disabled="article.favoriteDisabled"
                :class="{active: article.favorited}" @click="onFavorite(article)">
                  <i class="ion-heart"></i>{{article.favoritesCount}}
                </button>
              </div>
              <nuxt-link class="preview-link" :to="{
                name: 'article',
                params: {
                  slug: article.slug
                }
              }">
                <h1>{{article.title}}</h1>
                <p>{{article.description}}</p>
                <span>Read more...</span>
              </nuxt-link>
            </div>
            <div v-if="!articles.length" class="article-preview">
              No articles are here... yet.
            </div>

            <nav>
              <ul class="pagination">
                <li class="page-item" v-for="item in totalPage" :key="item" :class="{ active: item === page }">
                  <nuxt-link class="page-link" :to="{
                    name: 'home',
                    query: {
                      page: item,
                      tag: $route.query.tag
                    }
                  }">{{item}}</nuxt-link>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-md-3">
            <div class="sidebar">
              <p>Popular Tags</p>

              <div class="tag-list">
                <nuxt-link :to="{
                  name: 'home',
                  query: {
                    tag: item,
                    tab: 'tag'
                  }
                }" class="tag-pill tag-default" v-for="item in tags" :key="item">{{item}}</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticles, getFeedArticles, addFavoriteArticle, deleteFavoriteArticle } from '@/api/article';
import { getTags } from '@/api/tag';
import { mapState } from 'vuex';
export default {
  name: "HomePage",
  watchQuery: ['page', 'tag', 'tab'],
  async asyncData({ query, store }) {
    const page = Number.parseInt(query.page || 1);
    const limit = 25;
    const { tag } = query;
    const tab = query.tab || 'global_feed';
    const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles: getArticles;

    const [ articleRes, tagRes ] = await Promise.all([
      loadArticles({
        limit,
        tag: tag,
        offset: ( page - 1 ) * limit
      }),
      getTags()
    ]);

    const { articles, articlesCount } = articleRes.data;
    const { tags } = tagRes.data;

    articles.forEach(article => { article.favoriteDisabled = false });

    return {
      tag,
      limit,
      page,
      tags,
      articles,
      articlesCount,
      tab: query.tab || 'global_feed'
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit);
    }
  },
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if(article.favorited) {
        //取消点赞
        await deleteFavoriteArticle(article.slug); 
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        //点赞
        await addFavoriteArticle(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }

      article.favoriteDisabled = false;
    }
  }
};
</script> 

<style>
</style>