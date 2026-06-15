<template>
  <!-- 分页最外层容器 -->
  <div class="keyment-pagination">
    <!-- 根据 layoutList 的顺序，决定渲染哪些部分 -->
    <template
      v-for="item in layoutList"
      :key="item"
    >
      <!-- 上一页按钮 -->
      <button
        v-if="item === 'prev'"
        class="keyment-pagination__button"
        type="button"
        :disabled="props.disabled || innerCurrentPage <= 1"
        @click="prev"
        >
        <
      </button>

      <!-- 页码按钮区域 -->
      <ul
        v-else-if="item === 'pager'"
        class="keyment-pagination__pager"
        >
        <!-- page 是当前渲染出来的页码数字 -->
        <li
          v-for="page in pageCount"
          :key="page"
          >
          <button
            class="keyment-pagination__page"
            :class="{ 'is-active': page === innerCurrentPage }"
            type="button"
            :disabled="props.disabled"
            @click="setCurrentPage(page)"
            >
            {{ page }}
          </button>
        </li>
      </ul>

      <!-- 下一页按钮 -->
      <button
        v-else-if="item === 'next'"
        class="keyment-pagination__button"
        type="button"
        :disabled="props.disabled || innerCurrentPage >= pageCount"
        @click="next"
        >
        >
      </button>
    </template>
  </div>
</template>



<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { PaginationProps, PaginationEmits } from "./pagination";

defineOptions({
  name: "KyPagination"
});

const props = withDefaults(defineProps<PaginationProps>(), {
  total: 0,
  pageSize: 10,
  currentPage: 1,
  layout: "prev, pager, next",
  disabled: false
});

const emit = defineEmits<PaginationEmits>();

// 内部当前页。
// 如果用户不传 v-model，就靠它自己记录当前页。
const innerCurrentPage = ref(props.currentPage);

// 总页数 = 总条数 / 每页条数，向上取整。
// 例如 total=51，pageSize=10，那么 pageCount=6。
const pageCount = computed(() => {
  return Math.max(1, Math.ceil(props.total / props.pageSize));
});

// 把 "prev, pager, next" 拆成 ["prev", "pager", "next"]。
const layoutList = computed(() => {
  return props.layout
    .split(",")
    .map((item) => item.trim());
});

// 修改当前页。
// 所有点击页码、上一页、下一页，最后都走这个函数。
const setCurrentPage = (page: number) => {
  if (props.disabled) {
    return;
  }

  // 页码不能小于 1，也不能大于总页数。
  const nextPage = Math.min(Math.max(page, 1), pageCount.value);

  if (nextPage === innerCurrentPage.value) {
    return;
  }

  innerCurrentPage.value = nextPage;

  emit("update:currentPage", nextPage);
  emit("change", nextPage);
};

// 上一页
const prev = () => {
  setCurrentPage(innerCurrentPage.value - 1);
};

// 下一页
const next = () => {
  setCurrentPage(innerCurrentPage.value + 1);
};

// 如果外部 currentPage 变了，内部也同步。
watch(
  () => props.currentPage,
  (value) => {
    innerCurrentPage.value = value;
  }
);
</script>
