<template>
  <div>
    <v-dialog v-model="addEditProductVisible" max-width="600" persistent>
      <v-card :title="$t('createProduct')">
        <v-card-text>
          <v-row>
            <v-col col="12">
              <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field
                  class="mb-2"
                  v-model="productData.name"
                  :label="$t('productName')"
                  :readonly="loading"
                  :rules="[requiredName]"
                  variant="outlined"
                  density="comfortable"
                />
                <v-text-field
                  type="number"
                  class="mb-2"
                  v-model="productData.price"
                  :label="$t('productPrice')"
                  :readonly="loading"
                  :rules="[requiredPrice]"
                  variant="outlined"
                  density="comfortable"
                  @input="restrictPrice"
                />
                <v-text-field
                  type="number"
                  class="mb-2"
                  v-model="productData.quantity"
                  :label="$t('productQuantity')"
                  :readonly="loading"
                  :rules="[requiredQuantity]"
                  variant="outlined"
                  density="comfortable"
                  @input="restrictQuantity"
                />
                <v-text-field
                  v-model="productData.image"
                  :label="$t('productImage')"
                  :readonly="loading"
                  variant="outlined"
                  density="comfortable"
                />
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :text="$t('cancel')" @click="dismissAddEditProduct"></v-btn>
          <v-btn
            :disabled="!form"
            :text="$t('add')"
            :loading="loading"
            @click="dismissAddEditProduct"
            color="primary"
            variant="outlined"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import NumberUtil from "@/utils/number.util";

export default {
  name: "AddEditProduct",
  data: () => ({
    form: false,
  }),
  computed: {
    ...mapGetters({
      addEditProductVisible: "addProductDialog/visible",
      productData: "addProductDialog/data",
      loading: "addProductDialog/loading",
    }),
  },
  methods: {
    ...mapActions({
      showAddEditProduct: "addProductDialog/show",
      dismissAddEditProduct: "addProductDialog/dismiss",
      showLoading: "addProductDialog/showLoading",
      dismissLoading: "addProductDialog/dismissLoading",
      updatePrice: "addProductDialog/updatePrice",
      updateQuantity: "addProductDialog/updateQuantity",
    }),
    onSubmit() {
      if (!this.form) return;
      this.showLoading();
      setTimeout(() => this.dismissLoading(), 2000);
    },
    requiredName(v) {
      return !!v || "กรุณากรอกชื่อสินค้า";
    },
    requiredPrice(v) {
      return !!v || "กรุณากรอกราคาสินค้า";
    },
    requiredQuantity(v) {
      return !!v || "กรุณากรอกจำนวนสินค้า";
    },
    restrictPrice() {
      this.updatePrice(this.productData.price.match(/^\d+\.?\d{0,2}/));
    },
    restrictQuantity() {
      this.updateQuantity(this.productData.quantity.match(/^\d+/));
    },
  },
};
</script>
