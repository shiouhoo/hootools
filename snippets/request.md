### 一般请求
```vue
// 数据是否处于加载中
const loading = ref(false);
// 数据列表
const listData = ref([]);
// 请求函数
async function loadData() {
    loading.value = true;
    try {
        const res = await api();
        if (String(res.code) === '200') {
            listData.value = res.data;
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    } finally {
        loading.value = false;
    }
}
```
### 分页请求
```vue
// 数据是否处于加载中
const loading = ref(false);
// 分页数据
const pageInfo = ref({
    pageSize: 10,
    pageNumber: 0,
    totalCount: 0,
});
// 数据列表
const listData = ref([]);
// 请求函数
async function loadData() {
    loading.value = true;
    pageInfo.value.pageNumber++;
    try {
        const res = await api({
            pageSize: pageInfo.value.pageSize,
            pageNumber: pageInfo.value.pageNumber,
        });
        if (String(res.code) === '200') {
            listData.value = listData.value.concat(res.data);
            pageInfo.value.totalCount = res.pageInfo.totalCount;
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    } finally {
        loading.value = false;
    }
}
```
### 列表请求
```vue
// 数据是否处于加载中
const loading = ref(false);
// 数据是否已经加载完全部
const finished = ref(false);
// 分页数据
const pageInfo = ref({
    pageSize: 10,
    pageNumber: 0,
    totalCount: 0,
});
// 数据列表
const listData = ref([]);
// 请求函数
async function loadData() {
    loading.value = true;
    pageInfo.value.pageNumber++;
    try {
        const res = await api({
            pageSize: pageInfo.value.pageSize,
            pageNumber: pageInfo.value.pageNumber,
        });
        if (String(res.code) === '200') {
            listData.value = listData.value.concat(res.data);
            pageInfo.value.totalCount = res.pageInfo.totalCount;
            if (listData.value.length >= pageInfo.value.totalCount) {
                finished.value = true;
            }
        }
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
    } finally {
        loading.value = false;
    }
}
```