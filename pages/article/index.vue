<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <article-meta :article="article" :type="actionType"/>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      <hr />
      <div class="article-actions">
        <article-meta :article="article" :type="actionType"/>
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import articleMeta from "./components/article-meta.vue";
import ArticleComments from './components/article-comments.vue';
import { getArticleDetails } from "@/api/article";

export default {
  name: "Article",
  components: { articleMeta, ArticleComments },
  head() {
    return {
      title: `${this.article.title} -realword`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
  async asyncData({ params }) {
    const { data } = await getArticleDetails(params.slug);
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);

    return { article };
  },
  data() {
    return {
      actionType: ""
    }
  },
  mounted() {
    this.actionType = this.$route.params.actionType;
  }
};
</script>

<style>
</style>