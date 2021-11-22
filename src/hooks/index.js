import {onMounted, ref} from "vue";
import {useQuasar} from "quasar"
import {api} from "boot/axios";
import { copyToClipboard } from 'quasar'

export const useCopy = (data) => {
  copyToClipboard(data).then(() => {
    console.info("copy successful!")
  }).catch(() => {
    console.error("copy failed!")
  })
}

export const useTable = (name, defaultParams = {skip: 1, take: 10}) => {
  const $q = useQuasar();
  const loading = ref(false);
  const list = ref([]);
  const fetchParams = ref({});

  const pagination = ref({
    sortBy: "created_at",
    descending: true,
    ...defaultParams
  });

  const noRefFetchData = async (params = {}) => {
    const data = await api.list({...params, ...defaultParams});
    return data.items;
  };

  const fetchData = (params = {}) => {
    loading.value = true;
    const data = {
      skip: pagination.value.skip,
      take: pagination.value.take,
      ...fetchParams.value,
    };

    api.get(name, {
      params: fetchParams.value
    }).then(res => {
      list.value = res.data.list
    }).catch(() => {
      loading.value = false;
    });
  };

  const update = (id, params) => {
    loading.value = true;
    api
      .put(name + "/" + id, params)
      .then(() => {
        loading.value = false;
        fetchData();
      })
      .catch(() => {
        loading.value = false;
      });
  };

  const insert = (params) => {
    loading.value = true;
    api
      .post("/" + name, params)
      .then(() => {
        loading.value = false;
        fetchData();
      })
      .catch(() => {
        loading.value = false;
      });
  };

  const remove = (id) => {
    $q.dialog({
      title: "Remove",
      message: "Are you sure you want to delete?",
      cancel: true,
      persistent: true,
    }).onOk(() => {
      loading.value = true;
      api
        .delete("/" + name +"/"+ id)
        .then(() => {
          loading.value = false;
          fetchData();
        })
        .catch(() => {
          loading.value = false;
        });
    });
  };

  onMounted(fetchData);

  return {
    loading,
    fetchParams,
    list,
    pagnition: pagination,
    fetch: fetchData,
    noRefFetchData,
    update,
    remove,
    insert,
  };
};

export const useDialog = ({
                            insertFn, updateFn, preUpdate, preConfirm
                          } = {}) => {
  const model = ref(false);
  const mode = ref("INSERT");
  const form = ref({});

  const openInsert = () => {
    form.value = {};
    mode.value = "INSERT";
    model.value = true;
  };
  const openUpdate = (params) => {
    preUpdate && preUpdate(params)
    form.value = params;
    mode.value = "UPDATE";
    model.value = true;
  };

  const confirm = () => {
    preConfirm && preConfirm(form.value)
    if (mode.value === "INSERT") {
      insertFn && insertFn(form.value);
    } else {
      updateFn && updateFn(form.value._id, form.value);
    }
  };

  return {
    mode,
    model,
    form,
    openInsert,
    openUpdate,
    confirm,
  };
};

export const useTableColumns = (fields = []) => {
  return [...fields].map(field => {
    return {
      name: field,
      required: true,
      label: field,
      align: 'left',
      field,
      format: val => `${val}`,
      sortable: true
    }
  })
}

export const usePageBaseData = () => {
  const pagination = ref({rowsPerPage: 0})
  return {
    pagination
  }
}

export const useJsonViewDialog = (data) => {
  const $q = useQuasar();
  $q.dialog({
    component: VueJsonPretty,
    componentProps: {
      data
    }
  }).onOk(() => {
    alert("success")
    return false
  })
}
