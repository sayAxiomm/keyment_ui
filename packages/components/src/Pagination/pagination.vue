<template>
  <!-- 分页最外层容器 -->
  <div 
    class="keyment-pagination"
    :class="[
      `keyment-pagination--${props.size}`,
      { 'is-background': props.background }
    ]"
  >
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
        &lt;
      </button>

      <!-- 页码按钮区域 -->
      <ul
        v-else-if="item === 'pager'"
        class="keyment-pagination__pager"
        >
        <!-- page 是当前渲染出来的页码数字 -->
        <li
          v-for="page in pagers"
          :key="page"
          >
          <span
            v-if="page === '...'"
            class="keyment-pagination__ellipsis"
          >
            ...
          </span>

          <button
            v-else
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
        &gt;
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
  disabled: false,
  background: false,
  size: "default",
  pagerCount: 7
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

// 当前应该显示哪些页码。
// 页码很多时，会显示首页、尾页和当前页附近的页码，中间用 ... 省略。
const pagers = computed(() => {
  const count = Math.max(1, props.pagerCount);

  if (pageCount.value <= count) {
    const result: number[] = [];

    for (let page = 1; page <= pageCount.value; page += 1) {
      result.push(page);
    }

    return result;
  }

  const half = Math.floor(count / 2);

  let start = innerCurrentPage.value - half;
  let end = innerCurrentPage.value + half;

  if (start < 2) {
    start = 2;
    end = count - 1;
  }

  if (end > pageCount.value - 1) {
    end = pageCount.value - 1;
    start = pageCount.value - count + 2;
  }

  const result: Array<number | "..."> = [1];

  if (start > 2) {
    result.push("...");
  }

  for (let page = start; page <= end; page += 1) {
    result.push(page);
  }

  if (end < pageCount.value - 1) {
    result.push("...");
  }

  result.push(pageCount.value);

  return result;
});

// 如果外部 currentPage 变了，内部也同步。
watch(
  () => props.currentPage,
  (value) => {
    innerCurrentPage.value = value;
  }
);
</script>
<style scoped>
.keyment-pagination {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.keyment-pagination__pager {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.keyment-pagination__button,
.keyment-pagination__page {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 4px;
  background: transparent;
  color: #303133;
  cursor: pointer;
}

.keyment-pagination__button:hover,
.keyment-pagination__page:hover {
  color: #409eff;
}

.keyment-pagination__button:disabled,
.keyment-pagination__page:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.keyment-pagination__page.is-active {
  color: #409eff;
  font-weight: 700;
}

.keyment-pagination__ellipsis {
  min-width: 32px;
  height: 32px;
  color: #606266;
  line-height: 32px;
  text-align: center;
}

.keyment-pagination--small .keyment-pagination__button,
.keyment-pagination--small .keyment-pagination__page {
  min-width: 24px;
  height: 24px;
  font-size: 12px;
}

.keyment-pagination--large .keyment-pagination__button,
.keyment-pagination--large .keyment-pagination__page {
  min-width: 40px;
  height: 40px;
  font-size: 16px;
}

.keyment-pagination.is-background .keyment-pagination__button,
.keyment-pagination.is-background .keyment-pagination__page {
  background: #f4f4f5;
}

.keyment-pagination.is-background .keyment-pagination__button:hover,
.keyment-pagination.is-background .keyment-pagination__page:hover {
  color: #409eff;
}

.keyment-pagination.is-background .keyment-pagination__page.is-active {
  background: #409eff;
  color: #ffffff;
}

.keyment-pagination.is-background .keyment-pagination__button:disabled,
.keyment-pagination.is-background .keyment-pagination__page:disabled {
  background: #f4f4f5;
  color: #c0c4cc;
}
</style>
