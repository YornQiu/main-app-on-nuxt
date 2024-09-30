<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'
import { login } from '@/api'

const isLoading = ref(false)
const state = reactive({
  username: '',
  password: '',
  msg: '',
  timer: 0,
})

const onSubmit = useThrottleFn(async function () {
  const { username, password } = state

  if (!username) {
    showMsg('请输入账号')
    return
  }
  if (!password) {
    showMsg('请输入密码')
    return
  }

  try {
    state.msg = ''
    isLoading.value = true
    const { token_type, access_token, refresh_token } = await login({ username, password })

    utils.setItem('token_type', token_type)
    utils.setItem('access_token', access_token)
    utils.setItem('refresh_token', refresh_token)
    authUtils.toIndex()
  }
  finally {
    isLoading.value = false
  }
}, 1000)

function showMsg(msg: string) {
  state.msg = ''
  nextTick(() => {
    state.msg = msg
  })
}

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') onSubmit()
})
</script>

<template>
  <div class="login">
    <div class="login__header">
      <img src="/img/logo.svg" alt="logo" />
    </div>
    <div class="login__form">
      <ElInput v-model="state.username" placeholder="用户名或邮箱" autofocus>
        <template #prefix> <i class="icon-user"></i> </template>
      </ElInput>
      <ElInput v-model="state.password" placeholder="密码" show-password class="mt20">
        <template #prefix> <i class="icon-lock"></i> </template>
      </ElInput>

      <div class="login__msg tc mt20 mb20">
        <p v-if="state.msg">{{ state.msg }}</p>
      </div>
      <ElButton :loading="isLoading" type="primary" class="login__btn" @click="onSubmit">登 录</ElButton>
    </div>
  </div>
  <p class="footer pa b0 l0 w100 tc">© 深圳市钛锋智能有限公司</p>
</template>

<style lang="scss">
#app {
  height: 100vh;
  display: flex;
  background-color: #c2e9fb;
}

#app::before {
  content: '';
  display: block;
  position: fixed;
  width: 300%;
  height: 200%;
  top: 70%;
  left: -100%;
  border-radius: 50%;
  background: #19539b;
  animation: slide-up 0.4s cubic-bezier(0.02, 0.44, 0.4, 0.93);
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer {
  z-index: 10;
  color: #fff;
}

.login {
  z-index: 10;
  height: fit-content;
  margin: 15vh auto;
  padding: 60px 60px 100px;
  border-radius: 4px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: slide-down 0.4s cubic-bezier(0.02, 0.44, 0.4, 0.93);
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login__form {
  margin-top: 80px;

  .el-input__wrapper {
    border-radius: 0;
    box-shadow: 0 1px 0 rgba(25, 83, 155, 0.2);
    background-color: transparent;

    &:focus,
    &:hover,
    &.is-focus {
      box-shadow: 0 1px 0 rgba(25, 83, 155, 0.4);
    }

    .el-input__prefix {
      color: rgba(25, 83, 155, 0.6);
    }
  }

  .el-input__inner {
    height: 48px;
    color: #19539b;
    &::placeholder {
      color: rgba(25, 83, 155, 0.6);
    }
  }

  .login__msg {
    height: 18px;
    color: #db6a6a;

    p {
      animation: shake-x 0.3s;
    }
  }

  .login__btn {
    width: 100%;
    height: 48px;
  }
}

@keyframes shake-x {
  from,
  to {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  20%,
  60% {
    -webkit-transform: translateX(-10px);
    transform: translateX(-10px);
  }

  40%,
  80% {
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition-delay: 99999s;
  transition:
    color 99999s ease-out,
    background-color 99999s ease-out;
}
</style>
