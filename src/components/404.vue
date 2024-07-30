<!-- 404 页面 -->
<template>
  <div class="not-found">
    <div class="not-found__content">
      <h1>404</h1>
      <p>抱歉，您访问的页面不存在。</p>
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
.not-found__content {
    text-align: center;
}
.not-found__content h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.not-found__content p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
}

.not-found__content a {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.3s;
}
.not-found__content a:hover {
    background-color: #0056b3;
}
</style>