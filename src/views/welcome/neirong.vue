<template>
    <div class="plp">
        <img src="../../assets/images/welcome.jpg" alt="" class="ff">
    </div>
</template>

<script>
export default {
    created (){
        this.axios.get('articles').then(res => console.log(res.data))
    }
}
</script>

<style>
.plp{
    position: relative;
}
.ff{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 50%)
}
</style>
