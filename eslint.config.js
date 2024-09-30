import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

export default [
  // 指定匹配的文件类型
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
  },

  // 指定全局变量和环境
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  // 推荐的配置
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  // vue 文件配置
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  // 风格配置
  stylistic.configs.customize(),

  // 自定义配置
  {
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
    ignores: ['node_modules', 'dist', 'public'],
  },

]
