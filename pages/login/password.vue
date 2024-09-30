<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { updateDefaultPassword } from '@/api'

const state = reactive({
  isSubmitting: false,
  isNavigating: false,
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
  message: '',
})

async function onChangePassword() {
  const { oldPassword, newPassword, repeatPassword } = state
  const { username } = window.UAC.getContext()

  if (!validateUtils.validatePassword({ oldPassword, newPassword, repeatPassword, username })) return

  state.message = ''
  state.isSubmitting = true
  await updateDefaultPassword({ newPassword, oldPassword })
  ElMessage.success('密码修改成功')

  state.isNavigating = true

  setTimeout(() => {
    window.location.reload()
  }, 1000)
}
</script>

<template>
  <ElDialog
    :model-value="true"
    :show-close="false"
    :align-center="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    title="修改默认密码"
    size="small"
    width="480px"
  >
    <div class="px20 py12">
      <ElAlert
        v-if="state.message"
        type="error"
        :closable="false"
        show-icon
        class="mb20"
        :title="state.message"
      ></ElAlert>
      <ElAlert v-else type="warning" :closable="false" show-icon class="mb20" title="首次登录请修改默认密码">
        需包含字母和数字，不包含空格。 <br />
        可使用特殊字符，长度为8-16位。
      </ElAlert>

      <ElInput v-model="state.oldPassword" type="password" class="mb12" placeholder="原密码"></ElInput>
      <ElInput v-model="state.newPassword" type="password" class="mb12" placeholder="新密码"></ElInput>
      <ElInput v-model="state.repeatPassword" type="password" class="mb12" placeholder="重复新密码"></ElInput>

      <ElButton type="primary" :loading="state.isSubmitting" class="w100 mt20" @click="onChangePassword">
        {{ state.isNavigating ? ' 跳转中...' : '提 交' }}
      </ElButton>
    </div>
  </ElDialog>
</template>
