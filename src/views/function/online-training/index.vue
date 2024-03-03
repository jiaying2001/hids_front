<template>
  <div class="container">
    <a-card class="general-card">
      <template #title>Path Configuration</template>
      <div class="wrapper">
        <a-form layout="vertical" :model="formData" :style="{ width: '600px' }" @submit="handleSubmit">
          <a-form-item field="file" label="File Upload:">
            <a-upload v-model="formData.file"
                      :on-before-upload="onBeforeUpload"
                      />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" :loading="loading" @click="handleSubmit">Add</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { Message } from '@arco-design/web-vue'
import useLoading from '@/hooks/loading'
// eslint-disable-next-line import/no-cycle
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { uploadFile } from '@/api/file'

export default defineComponent({
  setup() {
    const form = new FormData()
    const formData = reactive({
      file: '',
    })
    const { loading, setLoading } = useLoading()
    const { t } = useI18n()
    const handleSubmit: any = async () => {
      setLoading(true)
      uploadFile(form)
      await router.push({
        name: 'workplace',
      })
      Message.success(t('Set successfully'))
      setLoading(false)
    }

    const onBeforeUpload = (file: File) => {
      form.append('file', file)
      return true
    }
    return {
      onBeforeUpload,
      defineComponent,
      formData,
      handleSubmit,
      loading,
    }
  },
})
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  background-color: var(--color-bg-2);
  :deep(.arco-form) {
    .arco-form-item {
      &:last-child {
        margin-top: 20px;
      }
    }
  }
}
</style>
