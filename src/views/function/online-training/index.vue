<template>
  <div class="container">
    <Breadcrumb :items="['function.name', 'online.training']" />
    <div class="content">
      <a-card class="general-card">
        <template #title>{{ $t('page-title') }}</template>
        <div class="wrapper">
          <a-form
            id="form"
            ref="myForm"
            :model="formData"
            :style="{ width: '600px' }"
            :label-col-props="{ span: 8 }"
            :wrapper-col-props="{ span: 16 }"
            class="form"
            @submit="handleSubmit"
          >
            <div v-if="false">
              {{formData}}
            </div>
            <a-form-item field="file_format" :label="$t('form-file-format')">
              <a-select v-model="formData.file_format">
                <a-option>RFC2454</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="os_type" :label="$t('form-os-type')">
              <a-select v-model="formData.os_type">
                <a-option>linux</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="app_name" :label="$t('form-app-name')">
              <a-select v-model="formData.app_name" allow-create>
                <a-option>sshd</a-option>
              </a-select>
            </a-form-item>
            <a-form-item field="access_type" :label="$t('form-access-type')">
              <a-space size="large">
                <a-radio-group v-model="formData.access_type">
                  <a-radio value="public">{{ $t('form-access-type-public') }}</a-radio>
                  <a-radio value="private">{{ $t('form-access-type-private') }}</a-radio>
                </a-radio-group>
              </a-space>
            </a-form-item>
            <a-form-item field="file" :label="$t('form-file-upload')">
              <a-upload :on-before-upload="onBeforeUpload" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" :loading="loading" @click="handleSubmit">Add</a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { Message } from '@arco-design/web-vue'
import useLoading from '@/hooks/loading'
// eslint-disable-next-line import/no-cycle
import router from '@/router'
import { useI18n } from 'vue-i18n'
import { uploadFile } from '@/api/file'

export default defineComponent({
  setup() {
    const formData = reactive({
      file_format: '',
      os_type: '',
      app_name: '',
      access_type: '',
    })
    const form = new FormData()
    const { loading, setLoading } = useLoading()
    const { t } = useI18n()
    const handleSubmit: any = async () => {
      setLoading(true)
      const blob = new Blob([JSON.stringify(formData)], { type: 'application/json' })
      form.append('meta', blob)
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

.container {
  padding: 0 20px 20px 20px;
}

//.content {
//  display: flex;
//  margin-top: 12px;
//
//  //&-left {
//  //  flex: 1;
//  //  margin-right: 16px;
//  //  overflow: hidden;
//  //  // background-color: var(--color-bg-2);
//  //
//  //  :deep(.arco-tabs-nav-tab) {
//  //    margin-left: 16px;
//  //  }
//  //}
//  //
//  //&-right {
//  //  width: 332px;
//  //}
//
//  .tab-pane-wrapper {
//    padding: 0 16px 16px 16px;
//  }
//}
</style>
