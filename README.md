# nuxt-todo-frontend
Nuxt.jsのチュートリアル

## 20210329

### ログインの実装

- `@nuxtjs/auth`のインストール

```shell
npm install @nuxtjs/auth
```

- `nuxt.config.js`の編集

```shell
  modules: [
    '@nuxtjs/auth',  # 追加
  ],
...
  // 認証関連
  auth: {
    redirect: {
      login: '/login',   // 未ログイン時に認証ルートへアクセスした際のリダイレクトURL
      logout: '/login',  // ログアウト時のリダイレクトURL
      callback: false,   // Oauth認証等で必要となる コールバックルート
      home: '/'         // ログイン後のリダイレクトURL
    },
    strategies: {
      local: {
        endpoints: {
          login: { url: 'api/login/access-token/', method: 'post', propertyName: 'access_token' },
          user: { url: 'api/login/me/', method: 'get', propertyName: false},
          logout: false
        },
      }
    }
  },
  router: {
    middleware: ['auth']
  },
```
