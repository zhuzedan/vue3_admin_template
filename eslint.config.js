import js from '@eslint/js'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'
import * as parserTypeScript from '@typescript-eslint/parser'
import { defineFlatConfig } from 'eslint-define-config'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'

export default defineFlatConfig([
  {
    // 基础JavaScript配置
    ...js.configs.recommended,
    // 忽略特定文件和目录
    ignores: [
      '**/.*',
      'dist/*',
      '*.d.ts',
      'public/*',
      'src/assets/**',
      'src/**/iconfont/**'
    ],
    // 定义全局变量
    languageOptions: {
      globals: {
        // index.d.ts
      }
    },
    // 插件配置
    plugins: {
      prettier: pluginPrettier
    },
    // 规则配置
    rules: {
      /**
       *  eslint-plugin-prettier: 禁用所有与代码格式化相关的 ESLint 规则，避免 ESLint 和 Prettier 的规则冲突
       *  @description
       *  包含 "eslint-config-prettier" 的规则
       *  将 Prettier 的格式化规则集成到 ESLint 中，使得 Prettier 的格式化问题可以通过 ESLint 报告并修复。
       *  它会在 ESLint 运行时调用 Prettier 来检查代码格式，并将不符合 Prettier 规则的地方标记为 ESLint 错误或警告。
       */
      ...pluginPrettier.configs.recommended.rules,
      'no-debugger': 'off', // 关闭对debugger语句的检查，适应开发调试需求
      // 对未使用的变量进行检查，但忽略以'_'开头的参数和变量
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      // 配置Prettier规则，确保代码格式一致性，自动处理行尾符
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ]
    }
  },
  {
    // TypeScript文件配置
    files: ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false
      }
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript
    },
    rules: {
      ...pluginTypeScript.configs.strict.rules,
      '@typescript-eslint/ban-types': 'off', //关闭对特定类型定义的检查，允许使用一些不推荐的类型
      '@typescript-eslint/no-redeclare': 'error', // 禁止变量或函数的重复声明
      '@typescript-eslint/ban-ts-comment': 'off', // 关闭对 TypeScript 注释的限制，允许使用 '// @ts-ignore' 等注释
      '@typescript-eslint/no-explicit-any': 'off', // 关闭对使用 'any' 类型的限制，但在实践中应尽量避免使用 'any'
      '@typescript-eslint/prefer-as-const': 'warn', // 建议在可能的情况下使用 'as const' 语法来优化类型推断
      '@typescript-eslint/no-empty-function': 'off', // 关闭对空函数体的检查，允许存在没有操作的函数
      '@typescript-eslint/no-non-null-assertion': 'off', // 关闭对非空断言的限制，但在使用时需确保安全性
      '@typescript-eslint/no-unused-expressions': 'off', // 关闭对未使用的表达式的检查，允许存在未使用的赋值等操作
      '@typescript-eslint/no-unsafe-function-type': 'off', // 关闭对潜在不安全函数类型的检查，允许使用函数类型
      '@typescript-eslint/no-import-type-side-effects': 'error', // 禁止导入类型时产生副作用
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 关闭对模块边界的显式类型定义要求
      '@typescript-eslint/consistent-type-imports': [
        // 要求在导入类型时保持一致性，禁止某些不一致的导入方式
        'error',
        { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' }
      ],
      '@typescript-eslint/prefer-literal-enum-member': [
        // 要求枚举成员尽量使用字面量类型，允许位运算表达式
        'error',
        { allowBitwiseExpressions: true }
      ],
      '@typescript-eslint/no-unused-vars': [
        // 检查未使用的变量，但忽略以下划线开头的参数或变量
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  },
  {
    // 针对声明文件的配置
    files: ['**/*.d.ts'],
    rules: {
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'unused-imports/no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.?([cm])js'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  },
  {
    // Vue文件配置
    files: ['**/*.vue'],
    languageOptions: {
      globals: {
        $: 'readonly',
        $$: 'readonly',
        $computed: 'readonly',
        $customRef: 'readonly',
        $ref: 'readonly',
        $shallowRef: 'readonly',
        $toRef: 'readonly'
      },
      parser: parserVue,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: ['.vue'],
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
      }
    },
    plugins: {
      vue: pluginVue
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs['vue3-essential'].rules,
      ...pluginVue.configs['vue3-recommended'].rules,
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-setup-props-reactivity-loss': 'off',
      // 配置 HTML 自闭合标签的规则
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          },
          svg: 'always',
          math: 'always'
        }
      ]
    }
  }
])
