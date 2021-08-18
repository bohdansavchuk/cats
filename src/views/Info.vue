<template>
    <div class="card">
        <h2 class="card-title">
            Card № {{$route.params.id}}
        </h2>
        <div v-for="card in cards" :key="card.id">
            <div class="card-desc">
                <div class="card-likes">
                    <svg width="25" height="25" aria-hidden="true" focusable="false" data-prefix="far" data-icon="heart"
                         class="svg-inline--fa fa-heart fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path fill="red"
                              d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
                    </svg>
                    <span>
                      {{card.likes}}
                    </span>
                </div>
                <div class="card-comments">
                    <svg width="25" height="25" aria-hidden="true" focusable="false" data-prefix="far"
                         data-icon="comment"
                         class="svg-inline--fa fa-comment fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path fill="blue"
                              d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"></path>
                    </svg>
                    <span>
                      {{card.comments}}
                    </span>
                </div>
                <div class="card-downloads">
                    <svg width="25" height="25" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download"
                         class="svg-inline--fa fa-download fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 512 512">
                        <path fill="green"
                              d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                    </svg>
                    <span>
                        {{card.downloads}}
                    </span>
                </div>
            </div>
            <div class="card-pillboxes">
                <div class="card-pillbox" v-for="(tag, index) in changedTags" :key="index">
                    {{tag}}
                </div>
            </div>
            <a :href="card.pageURL" class="card-link" target="_blank">
                {{card.pageURL}}
            </a>
            <img class="card-image" :src="card.webformatURL" alt="image">
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Info",
        data() {
            return {
                cards: []
            }
        },
        methods: {
            ...mapActions([
                'getCardsFromApi'
            ]),
            getCard() {
                this.cards = this.cardsState.filter((item) => item.id === parseInt(this.$route.params.id, 10))
            }
        },
        computed: {
            ...mapGetters([
                'cardsState'
            ]),
            changedTags() {
                return this.cards[0].tags.split(',');
            }
        },
        async mounted() {
            await this.getCardsFromApi();
            this.getCard();
        }
    }
</script>

<style lang="scss" scoped>

    .card {
        padding: 20px;
        &-image {
            max-width: 100%;
            margin-bottom: 20px;
            border-radius: 10px;
        }
        &-title {
            margin-bottom: 20px;
        }
        &-desc {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        &-likes,
        &-comments,
        &-downloads{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            span {
                display: flex;
                align-items: center;
                margin-left: 10px;
                font-size: 14px;
            }
        }
        &-link {
            display: block;
            margin-bottom: 20px;
        }
        &-pillboxes {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 20px;
        }
        &-pillbox {
            margin: 2px;
            padding: 10px;
            border-radius: 5px;
            background: blueviolet;
            color: #ffffff;
            font-size: 14px;
            white-space: nowrap;
        }
    }

</style>