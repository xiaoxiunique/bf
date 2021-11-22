<template>
  <q-page class="q-ma-lg q-pa-lg flex flex-row" style="align-items: flex-start; align-content: flex-start">
    <template v-for="item in list" :key="item._id">
      <CartItem :item='item' @edit="openUpdate" @delete="remove(item._id)" ></CartItem>
    </template>
    <div
      class="
        ds-card-item
        flex
        justify-center
        q-pa-md q-ma-md
        bg-white
        cursor-pointer
      "
      style="width: 260px; overflow: hidden; align-items: center"
      @click="openInsert"
    >
      <q-icon style="display: block;" class="text-subtitle1" size="xl" name="add"></q-icon>
    </div>

    <DSCronDialog
      v-model="model"
      :mode="mode"
      :model-data="form"
      @ok="confirm"
      title="Title"
    ></DSCronDialog>
    <DialogJsonViewer
      v-model="jsonViewDialog.model"
      :model-data="jsonViewDialog.form"
      @ok="jsonViewDialog.confirm()"
      title="CronExpr"
    ></DialogJsonViewer>
  </q-page>
</template>
<script>
import { onMounted, ref } from "vue";
import DSCronDialog from "components/DSCronDialog";
import "vue-json-pretty/lib/styles.css";

import { useCopy, useDialog, useTable } from "src/hooks";
import { QCard, useQuasar } from "quasar";
import DialogJsonViewer from "components/DialogJsonViewer";
import CartItem from "components/CartItem";

const columns = ["picLink", "name", "type", "cronExpr", "data", "action"].map(
  (field) => {
    let conf = {
      name: field,
      required: true,
      label: field,
      align: "left",
      field,
      format: (val) => `${val}`,
      sortable: true,
    };

    if (field === "data") {
      conf.format = (val) => `${val && val.curlText}`;
    } else if (field === "action") {
      conf.style = "width: 150px";
    }
    return conf;
  }
);

export default {
  components: {CartItem, DialogJsonViewer, DSCronDialog },
  setup() {
    const pagination = ref({ rowsPerPage: 0 });
    const taskCtl = useTable("tasks");
    const $q = useQuasar();
    const dialog = useDialog({
      insertFn: taskCtl.insert,
      updateFn: taskCtl.update,
      preConfirm: (data) => {
        data.data = { curlText: data.curlText };
      },
      preUpdate: (data) => {
        data.curlText = data.data.curlText;
      },
    });
    const jsonViewDialog = useDialog();
    onMounted(() => {
      taskCtl.fetch();
    });
    const handleJsonView = (data) => {
      $q.dialog({
        component: QCard,
        componentProps: {
          data: { name: "string" },
        },
      }).onOk(() => {
        return false;
      });
    };

    const handleImport = () => {};

    return {
      ...dialog,
      ...taskCtl,
      jsonViewDialog: ref(jsonViewDialog),
      name: ref(""),
      columns,
      pagination,
      handleJsonView,
      handleImport,
      useCopy,
    };
  },
};
</script>

<style lang="sass">
.ds-card-item
  height: 160px
  max-height: 155px
  border-radius: 6px
  border: 2px solid transparent
  &:hover
    border: 2px solid #000
    &-more
      border: 1px solid red
</style>
