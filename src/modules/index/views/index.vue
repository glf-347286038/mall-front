<template>
    <div>
        <Swiper :options="spOptions">
            <SwiperSlide>
                <img src="../img/iphoneXSAMAX.jpg" alt srcset />
            </SwiperSlide>
            <SwiperSlide>
                <img src="../img/华为Mate40PRO.jpg" alt srcset />
            </SwiperSlide>
            <SwiperSlide>
                <img src="../img/华为nova8PRO.jpg" alt srcset />
            </SwiperSlide>
            <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide } from "vue-awesome-swiper";
    import "swiper/swiper.min.css";
    export default {
        components: {
            Swiper,
            SwiperSlide
        },
        data() {
            return {
                spOptions: {
                    loop: true,
                    autoplay: {
                        delay: 1000
                    },
                    pagination: {
                        el: ".swiper-pagination"
                    }
                }
            };
        }
    };
</script>

<style lang="scss">
    $h: 200px;
    .swiper-container {
        height: $h;
        width: 100%;
        img {
            height: $h;
            width: 100%;
        }
        .swiper-pagination {
            .swiper-pagination-bullet-active {
                background: #fff;
            }
        }
    }
</style>
