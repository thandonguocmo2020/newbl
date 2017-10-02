<template>
  <div class="page-main" v-if="user">

    <div class="mb-10">
      <button type="button" class="btn btn-outline btn-primary" @click="showCreate">
        <i class="icon wb-plus" aria-hidden="true"></i> ADD</button>
    </div>

    <table class="table">
      <thead class="thead-inverse">
        <tr>
          <th class="text-center">IMG</th>
          <th class="text-center">TITLE</th>
          <th class="text-center">CREATE</th>
          <th class="text-center">ACTION</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p,i) in posts">
          <th class="text-center"><img :src="p.img" width="50" height="50" /></th>
          <td width="50%">
            <a :href="'/p/'+p.sid">{{p.tl}}</a>
          </td>
          <td width="20%" class="text-center">{{ toDate(p.at) }}</td>
          <td width="20%" class="text-center">
            <button class="btn btn-sm btn-success  ml-10" @click="editPost(p)"> EDIT</button>
            <button class="btn btn-sm btn-danger  ml-10" @click="deletePost(p._id)"> DELETE</button>

          </td>
        </tr>
      </tbody>
    </table>

    <div class="row">
      <div class="col-12" v-if="numPage > 0">
        <paginate :page-count="numPage" :margin-pages="2" :page-range="3" :click-handler="clickCallback" :prev-text="'Prev'" :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
        </paginate>

      </div>
    </div>

    <!-- large -->
    <el-dialog :title="update == false ? 'Create Post' : 'Update Post'"  :size="'small'" :visible.sync="dialogTableVisible">
      <form id="myForm" method="post" v-on:submit.prevent="login($event)">
        <div class="row">

          <div class="col-lg-12 form-group">
            <label name="title"> Title </label>
            <input type="text" class="form-control" v-validate="'required'" name="tl" :class="{'input': true, 'is-danger': errors.has('tl') }" v-model="title" placeholder="Title Post">
            <span v-show="errors.has('tl')" class="help text-danger">{{ errors.first('tl') }}</span>
          </div>

          <div class="col-lg-12 form-group">
            <label name="title"> Thumnail </label>
            <input type="url" v-validate="'required|url'" name="img" :class="{'input': true, 'is-danger': errors.has('img') }" v-model="img" class="form-control" placeholder="Image Link">
            <span v-show="errors.has('img')" class="help text-danger">{{ errors.first('img') }}</span>
          </div>

          <div class="col-lg-12 form-group">
            <label name="title"> Content </label>
            <VueEditor v-model="content" id="editor">
              {{content}}
            </VueEditor>
            <p></p>
          </div>

          <!-- <div class="col-lg-12 form-group">
            <label name="title"> Source </label>
            <input type="url" v-model="src" v-validate="'required|url'" name="source" :class="{'input': true, 'is-danger': errors.has('source') }" class="form-control" placeholder="link source">
            <span v-show="errors.has('source')" class="help text-danger">{{ errors.first('source') }}</span>

          </div> -->

          <div class="col-lg-12 form-group">
            <label name="title"> page title </label>
            <input type="text" v-model="seo_tl" v-validate="'required'" name="title_seo" :class="{'input': true, 'is-danger': errors.has('title_seo') }" class="form-control" placeholder="page-url-title">
            <span v-show="errors.has('title_seo')" class="help text-danger">{{ errors.first('title_seo') }}</span>

          </div>

          <div class="col-lg-12 form-group">
            <label name="title"> Description </label>
            <textarea type="text" v-validate="'required'" name="description" :class="{'input': true, 'is-danger': errors.has('description') }" rows="5" v-model="seo_des" class="form-control" placeholder="Description"> </textarea>
            <span v-show="errors.has('description')" class="help text-danger">{{ errors.first('description') }}</span>

          </div>

          <div class="col-lg-12 form-group">
            <el-tag :key="tag" v-for="tag in dynamicTags" :closable="true" :close-transition="false" @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input class="input-new-tag mr-5 btn btn-sm" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

          </div>
          <div class="col-lg-12 form-group">

            <button v-if="update==false" type="button" class="btn btn-md btn-success" @click="submitPost"> Save </button>

            <button v-else type="button" class="btn btn-md btn-success" @click="updatePost"> Update </button>

          </div>
        </div>
      </form>
    </el-dialog>
  </div>
  </div>
  </div>
</template>
<script>
import { Dialog, FormItem, Upload, Button, Tag, Input } from 'element-ui';
import { VueEditor } from 'vue2-editor';
import { mapState, mapGetters } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      _id: null,
      update: false,
      numPage: 1,
      dialogTableVisible: false,
      title: '',
      img: '',
      content: '',
      seo_tl: '',
      seo_des: '',
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      src: '',
      deleteItem: []

    }
  },
  components: {
    'el-dialog': Dialog,
    VueEditor,
    'el-upload': Upload,
    'el-form-item': FormItem,
    'el-button': Button,
    'el-tag': Tag,
    'el-input': Input
  },
  computed: {
    ...mapState({
      'user': 'member'
    }),

    ...mapGetters([
      'posts'
    ])
  },

  methods: {
    toDate(date) {
      return moment(date).format('l');
    },
    clickCallback(pageNum) {
      let par = {
        _uid: this.user.member._id,
        page: pageNum
      }
      this.$store.dispatch('FETCH_POST', par);
    },

    showCreate() {
      this.update = false;
      this.dialogTableVisible = true;
    },


 
    // create
    submitPost() {

      let seft = this;
      this.$validator.validateAll();


      if (!this.errors.any()) {
        this.dialogTableVisible = false;

        let formPost = JSON.parse(JSON.stringify({
          tl: this.title,
          img: this.img,
          pl: this.seo_tl,
          desc: this.seo_des,
          src: this.src,
          htm: this.content,
          tags: this.dynamicTags,
          auth: this.user.member,
          _uid: this.user.member._id
        }));


        this.$store.dispatch('POST_CREATE', formPost).then(resCreate => {

          if (resCreate.body.stt == 1) {
            Object.assign(seft.$data, seft.$options.data());
            seft.$message({
              type: 'success',
              title: "alert ",
              message: resCreate.body.message,
              duration: 4000
            })


          } else {

            seft.$message({
              type: 'warning',
              title: "alert ",
              message: resCreate.body.message,
              duration: 4000
            })
          }
        });

      }
    },



    updatePost() {
      let seft = this;
      let formPost = JSON.parse(JSON.stringify({
        _id: this._id,
        tl: this.title,
        img: this.img,
        pl: this.seo_tl,
        desc: this.seo_des,
        src: this.src,
        htm: this.content,
        tags: this.dynamicTags,
        auth: this.user.member,
        _uid: this.user.member._id,
        update: 'true'
      }));



      this.$store.dispatch('UPDATE_POST', formPost).then(api => {
        if (api.body.stt == 1) {
          Object.assign(seft.$data, seft.$options.data());
          seft.$message({
            type: 'success',
            title: 'alert update',
            message: api.body.message,
            duration: 4000
          });

          this.update = false;
          this.dialogTableVisible = false;

        } else {
          this.update = false;
          this.dialogTableVisible = false;
        }
      });


    },

    deletePost(postId) {
      this.$store.dispatch('POST_DELETE', { _id: postId }).then(api => {
        if (api.body.stt == 1) {
          seft.$message({
            type: 'success',
            title: 'alert update',
            message: api.body.message,
            duration: 3000
          });
        }
      });
    },
    // edit

    editPost(post) {
      this._id = post._id,
        this.update = true;
      this.dialogTableVisible = true;
      this.title = post.tl;
      this.img = post.img;
      this.seo_tl = post.slg;
      this.seo_des = post.desc;
      this.src = post.src;
      this.content = post.htm;
      this.dynamicTags = post.tags;
    },

    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    fetchPost() {
      if (this.user) {
        let seft = this;
        setTimeout(function() {
          seft.$store.dispatch('FETCH_POST', { _uid: seft.user.member._id }).then(resP => {
            if (resP.body.stt == 1) {
              if (resP.body.num > 0) {
                seft.numPage = Math.round(resP.body.num / 20);

              }
            }
          });
        }, 500);
      }
    }
  },
  created() {
    let token = localStorage.getItem("hash");
    this.$store.dispatch("MEMBER_INFO", { token: token });
  },
  mounted() {
    this.fetchPost();
  }
}
</script>

<style scoped="">
@import url('//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css');

.page {
  margin-left: 0px;
}

.page-main {
  min-height: 720px;
}

#editor {
  height: 350px;
  min-height: 450px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-tag {
  margin-right: 5px;
}
</style>