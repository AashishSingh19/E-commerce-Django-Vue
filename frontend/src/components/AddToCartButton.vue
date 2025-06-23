<template>
    <BaseButton
        variant="primary"
        :disabled="disabled || loading"
        @click="handleAddToCart"
    >
    <span v-if="loading">Adding...</span>
    <span v-else>Add To Cart</span>
    </BaseButton>
</template>

<script lang="ts" setup>
import BaseButton from './BaseButton.vue';
import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { ref } from 'vue';


const props = defineProps<{
    productId: number
    disabled?: boolean
}>()

const loading = ref(false)
const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()
const toast = useToast()


async function handleAddToCart() {
  if (!authStore.user) {
    toast.warning('Please login to add items to cart.')
    router.push('/login')
    return
  }

  try {
    loading.value = true
    await cartStore.addItem(props.productId)
    toast.success('Added to cart!')
  } catch (err: any) {
    if(err.response?.data?.detail === 'Item already in cart'){
        toast.info('Item already in cart')
    }else{
        toast.error('Failed to add item to cart.')
    }
  }finally{
    loading.value = false
  }
}
</script>

<style>

</style>