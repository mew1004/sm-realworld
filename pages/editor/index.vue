<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.tagList"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button :disabled="publishDisabled"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button" @click="publishArticle"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle, publicArticle, updateArticle } from "@/api/article";
export default {
  middleware: "authenticated", //在路由匹配组件之前会先执行中间件处理
  name: "Editor",
  data() {
    return {
      publishDisabled: false,
      article: {
        title: "",
        description: "",
        body: "",
        tag: "",
        tagList: ""
      }
    }
  },
  async asyncData({ params }) {
    if(params.slug) {//修改文章信息时，先获取文章详情
      const { data } = await getArticle(params.slug);
      return { slug: params.slug, article: data.article }
    } else {
      return { article: {} }
    }
  },
  methods: {
    async publishArticle() {
      this.publishDisabled = true;
      const { data } = this.slug ? 
        await updateArticle(this.slug, { article: this.article }) : 
        await publicArticle({ article: this.article });
      this.publishDisabled = true;

      this.$router.push({
        name: 'article',
        params: { 
          slug: data.article.slug,
          actionType: 'edit'
        }
      });
    }
  }
};
</script>