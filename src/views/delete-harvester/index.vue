<template>
  <div class="container">
    <a-card class="general-card">
      <template #title>Path Deletion</template>
      <div class="wrapper">
        <a-form layout="vertical" :model="formData" :style="{ width: '600px' }" @submit="handleSubmit">
          <a-form-item field="path" label="File Path:">
            <a-select v-model="formData.path" :style="{ width: '320px' }" placeholder="Please select ...">
              <a-option v-for="(config, index) in allowedConfigs" :key="index" :value="config">
                {{ config }}
              </a-option>
            </a-select>
          </a-form-item>
          <br />
          <br />
          <a-form-item>
            <a-button type="primary" html-type="submit" :loading="loading" @click="handleSubmit">Delete</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
import { getHarvesterConfig, addHarvesterConfig, deleteHarvesterConfig } from "@/api/harvester";
import { Message } from '@arco-design/web-vue'
import useLoading from '@/hooks/loading'
// eslint-disable-next-line import/no-cycle
import router from '@/router'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup() {
    const formData = reactive({
      path: '',
    })
    const allAllowedConfigs = ['1.txt', '2.txt', '3.txt']
    const allowedConfigs = ref()
    const fetchData = async () => {
      try {
        const harvesterConfigs = await getHarvesterConfig()
        allowedConfigs.value = allAllowedConfigs.filter((item1) => harvesterConfigs.some((item2) => item1 === item2.path))
      } catch (err) {
        // you can report use errorHandler or other
      }
    }
    fetchData()
    const { loading, setLoading } = useLoading()
    const { t } = useI18n()
    const handleSubmit: any = async ({ values, errors }) => {
      setLoading(true)
      await deleteHarvesterConfig({ config: formData })
      await router.push({
        name: 'workplace',
      })
      Message.success(t('Deleted successfully'))
      setLoading(false)
    }
    return {
      allowedConfigs,
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
