<template>
  <div
    class="
        ds-card-item
        flex-col
        q-pa-md q-ma-md
        bg-white
        q-card--bordered
        cursor-pointer
        relative-position
      "
    style="width: 260px; overflow: hidden"
  >
    <div class="flex flex-row justify-between">
      <q-img
        :src="item.picLink || 'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6bdafd801c878b10edb5fed5d00969e9.svg'"
        class="q-mb-md"
        fit="contain"
        width="50px"
        height="50px"
      ></q-img>

      <q-btn
        class="ds-card-item-more absolute-top-right"
        flat
        fab
        icon="more_horiz"
        outline
        size="xs"
      >
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section @click="handleEdit(item)">Edit</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Detail</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section @click="handleDelete(item)">Delete</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
    <div class="text-h6">{{item.name || 'not'}}</div>
    <div class="text-body2 text-grey-6 text-no-wrap text-amber">
      {{item.description || 'not over time'}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: Object
  },
  setup (props, {emit}) {
    function handleEdit(item) {
      emit("edit", item)
    }

    function handleDelete(item) {
      emit("delete", item)
    }

    return {
      handleEdit,
      handleDelete
    }
  }
}
</script>

<style lang="sass">
.ds-card-item
  height: 150px
  max-height: 150px
  border-radius: 6px
  border: 2px solid transparent
  &:hover
    border: 2px solid #000
    &-more
      border: 1px solid red
</style>
