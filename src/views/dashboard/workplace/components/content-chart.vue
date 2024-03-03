<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      :body-style="{
        paddingTop: '20px',
      }"
      :title="$t('workplace.contentData')"
    >
      <template #extra>
        <router-link to="/harvester/add">
          <a-link>
            <IconPlusCircle />
            Add
          </a-link>
        </router-link>
        <router-link to="/harvester/delete">
          <a-link>
            <IconMinusCircle />
            Delete
          </a-link>
        </router-link>
      </template>
      <!-- <Chart height="289px" :option="chartOption"/> -->
      <div style="height: 289px;">
        <div style="font-size: 25px;" v-for="(config, index) in harvesterConfigs" :key="index">
          {{config.path}}
        </div>
      </div>

    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { getHarvesterConfig } from '@/api/harvester'
import useLoading from '@/hooks/loading'
import { AnyObject } from '@/types/global'
import { defineComponent, ref } from 'vue'

function graphicFactory(side: AnyObject) {
  return {
    type: 'text',
    bottom: '8',
    ...side,
    style: {
      text: '',
      textAlign: 'center',
      fill: '#4E5969',
      fontSize: 12,
    },
  }
}
export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(true)
    const harvesterConfigs = ref(null)
    const fetchData = async () => {
      try {
       setLoading(true)
        harvesterConfigs.value = await getHarvesterConfig();
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return {
      loading,
      harvesterConfigs,
    }
  },
})
</script>

<style scoped lang="less"></style>
