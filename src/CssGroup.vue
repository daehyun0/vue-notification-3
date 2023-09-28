<template>
  <transition-group :name="name">
    <slot/>
  </transition-group>
</template>
<script>
export default {
  inheritAttrs: false,
  name: 'CssGroup',
  props: ['name']
}
</script>
