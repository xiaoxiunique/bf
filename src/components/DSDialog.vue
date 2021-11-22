<template>
  <!-- notice dialogRef here -->
  <q-dialog ref="dialogRef" @hide="onDialogHide" v-bind="$attrs">
    <q-card
      class="q-dialog-plugin"
      style="width: 650px; max-width: 80vw; padding: 20px"
    >
      <q-card-section class="text-h6">
        {{ title }}
      </q-card-section>
      <q-card-section>
        <slot></slot>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn unelevated label="Cancel" @click="onCancelClick" />
        <q-btn unelevated color="primary" label="OK" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from "quasar";

export default {
  props: {
    title: {
      type: String,
      default: "Title",
    },
  },

  emits: [...useDialogPluginComponent.emits],

  setup(props, { emit }) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    return {
      dialogRef,
      onDialogHide,

      onOKClick() {
        onDialogOK();
      },

      // we can passthrough onDialogCancel directly
      onCancelClick: onDialogCancel,
    };
  },
};
</script>
