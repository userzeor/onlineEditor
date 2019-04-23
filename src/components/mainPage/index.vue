<template>
  <div class="mainPage" ref="page">
    <div class="header-cont" ref="header">
      <span class="header-item">
        <span class="header-item-text">语言模式</span>
        <el-select v-model="currentMode" placeholder="(默认‘htmlmixed’)" class="select-theme" @change="changeMode">
          <el-option
            v-for="(item, index) in mode"
            :key="index"
            :label="item.text"
            :value="item.mode">
          </el-option>
        </el-select>
      </span>
      <span class="header-item">
        <span class="header-item-text">主题</span>
        <el-select v-model="currentTheme" placeholder="(默认‘dracula-custom’)" class="select-theme" @change="changeTheme">
          <el-option
            v-for="item in themes"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </span>
      <span class="header-item">
        <span class="header-item-text">菜单项</span>
      </span>
      <span class="header-item">
        <el-button type="primary" @click="toFormatJson" v-if="currentMode==='application/json'">格式化json</el-button>
      </span>
      <el-dropdown class="user-set" placement="bottom-start" @command="userCommand">
        <i class="el-icon-setting"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-setting" command="userSet">用戶设置</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="code-panel" :style="{height: panelHeight + 'px',fontSize: panelFontSize + 'px'}">
      <textarea ref="code" name="code"></textarea>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <div class="dialog-cont">
        <div class="dialog-list">
          <label>编辑器字体大小</label>
          <span class="dialog-input">
            <el-input v-model="panelFontSize" placeholder="请输入字体大小"></el-input>
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import * as CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'

import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/xml-fold'
import 'codemirror/addon/fold/indent-fold'
import 'codemirror/addon/fold/markdown-fold'
import 'codemirror/addon/fold/comment-fold'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/go/go'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/http/http'
import 'codemirror/mode/php/php'
import 'codemirror/mode/python/python'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/xml/xml'

import 'codemirror/keymap/sublime.js'
import 'codemirror/keymap/emacs.js'
import 'codemirror/keymap/vim.js'

import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/addon/hint/html-hint'
import 'codemirror/addon/hint/xml-hint'
import 'codemirror/addon/hint/anyword-hint'
import 'codemirror/addon/hint/css-hint'

import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/searchcursor'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/search/matchesonscrollbar.css'
import 'codemirror/addon/search/matchesonscrollbar'
import 'codemirror/addon/search/match-highlighter'

import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/selection/active-line'

import formatJson from '../../lib/jsl-format'

export default {
  name: 'mainPage',
  computed: {
  },
  data: function () {
    return {
      dialogVisible: false,
      panelHeight: 0,
      panelFontSize: 14,
      CodeMirrorEditor: '',
      currentTheme: '',
      currentMode: 'application/json',
      themes: [],
      mode: [{'mode': 'htmlmixed', text: 'htmlmixed'}, {'mode': 'application/json', text: 'json'}, {'mode': 'go', text: 'go'}, {'mode': 'javascript', text: 'javascript'}, {'mode': 'php', text: 'php'}, {'mode': 'python', text: 'python'}, {'mode': 'sql', text: 'sql'}, {'mode': 'vue', text: 'vue'}, {'mode': 'xml', text: 'xml'}, {'mode': 'text/x-csrc', text: 'c'}, {'mode': 'text/x-c++src', text: 'c++'}, {'mode': 'text/x-java', text: 'java'}, {'mode': 'text/x-csharp', text: 'c#'}, {'mode': 'text/x-objectivec', text: 'object-c'}]
    }
  },
  methods: {
    changeTheme (val) {
      this.CodeMirrorEditor.setOption('theme', val)
    },
    changeMode (val) {
      this.CodeMirrorEditor.setOption('mode', val)
    },
    userCommand (command) {
      switch (command) {
        case 'userSet':
          this.dialogVisible = true
          break
      }
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {
        })
    },
    toFormatJson () {
      this.CodeMirrorEditor.setValue(formatJson(this.CodeMirrorEditor.getValue()))
    }
  },
  created: function () {
    this.themes = process.env.THEMES
  },
  mounted: function () {
    this.$nextTick(function () {
      let myTextarea = this.$refs.code
      this.CodeMirrorEditor = CodeMirror.fromTextArea(myTextarea, {
        mode: 'application/json', // 编辑器语言
        theme: 'dracula-custom', // 编辑器主题
        extraKeys: {'Ctrl-Space': 'autocomplete', 'Ctrl-F': 'find', 'Ctrl-R': 'replace'}, // ctrl可以弹出选择项
        lineNumbers: true, // 显示行号
        lineWrapping: true, // 是否代码折叠
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        autofocus: true,
        scrollbarStyle: 'overlay',
        styleActiveLine: true
      })
      this.panelHeight = this.$refs.page.clientHeight - this.$refs.header.clientHeight
      console.log(this.CodeMirrorEditor.getOption('theme'))
    })
  },
  beforeUpdate: function () {

  },
  updated: function () {
    this.$nextTick(function () {

    })
  }
}
</script>

<style>
  .mainPage .CodeMirror {
    height: 100%;
  }
  .header-cont .el-input__inner{
    background-color: #282a36;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .mainPage,.CodeMirror {
    position: relative;
    height: 100%;
  }
  /*选择主题选择器*/
  .select-theme{
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
    /*z-index: 10;*/
  }
  /*编辑器头部*/
  .header-cont{
    padding: 11px 60px 11px 15px;
    background-color: #282a36;
  }
  .user-set{
    position: absolute;
    top: 18px;
    right: 25px;
    z-index: 10;
    cursor: pointer;
    outline: none;
    font-size: 24px;
    color: #606266;
  }
  .header-item{

  }
  .header-item-text{
    padding: 0 10px;
    color: #606266;
  }
  /*弹出框样式*/
  .dialog-cont{

  }
  .dialog-list{
    padding: 0 15px;
  }
  .dialog-input{
    display: inline-block;
  }
  .dialog-list label{
    display: inline-block;
    padding-right: 15px;
    font-size: 16px;
  }
  /*下拉框样式*/
  .el-dropdown-menu__item {
    white-space: nowrap;
  }
</style>
