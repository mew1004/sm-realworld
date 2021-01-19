<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="profileSettings">
              <i class="ion-gear-a"></i>
              &nbsp; Editor Profile Settings
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link exact
                  class="nav-link disabled"
                  :class="{ active: tab === 'my_articles' }"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'my_articles',
                    },
                  }"
                  >My Articles
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link exact
                  class="nav-link"
                  :class="{ active: tab === 'favorited_articles' }"
                  :to="{
                    name: 'profile',
                    query: {
                      tab: 'favorited_articles',
                    },
                  }"
                  >Favorited Articles
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug">
            <div class="article-meta">
              <img :src="article.author.image" />
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username,
                    },
                  }"
                >
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{
                  article.createdAt | date("MMM DD，YYYY")
                }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :disabled="article.favoriteDisabled"
                :class="{ active: article.favorited }"
                @click="onFavorite(article)"
              >
                <i class="ion-heart"></i>{{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                  actionType: 'edit'
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfiles } from "@/api/profiles";
import {
  getArticles,
  addFavoriteArticle,
  deleteFavoriteArticle,
} from "@/api/article";
export default {
  middleware: "authenticated", //在路由匹配组件之前会先执行中间件处理
  name: "UserProfile",
  watchQuery: ['tab'],
  async asyncData({ query, store }) {
    const username = store.state.user.username;
    const tab = query.tab || 'my_articles';
    const [articleRes, profileRes] = await Promise.all([
      getArticles({ 
        limit: 10,
        offset: 0,
        author: tab === 'my_articles' ? username: '',
        favorited: tab === 'favorited_articles' ? username: ''
      }),
      getProfiles(username),
    ]);

    const { articles } = articleRes.data;
    const { profile } = profileRes.data;
    articles.forEach((article) => { article.favoriteDisabled = false; });

    return {
      articles, profile,
      tab: query.tab || 'my_articles'
    };
  },
  methods: {
    profileSettings() {
      this.$router.push("/settings");
    },
    async onFavorite(article) {
      article.favoriteDisabled = true;
      if (article.favorited) {
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
  },
};
</script>

<style>
</style>