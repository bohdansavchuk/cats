<template>
    <div class="page">
        <h1>Our cats</h1>
        <div class="sort-block">
            <a href="" @click.prevent="sort('likes')">
                sort by likes
            </a>
            <a href="" @click.prevent="sort('comments')">
                sort by comments
            </a>
            <input type="text" v-model="search" on-keyup="filteredList | debounce 500" placeholder="Filter by tag" class="input">
        </div>
        <div class="card-container">
            <Card
                    v-for="card in filteredList" :key="card.id"
                    :url="card.previewURL"
                    :likes="card.likes"
                    :comments="card.comments"
                    :tags="card.tags"
                    :id="card.id"
            />
        </div>
    </div>
</template>

<script>
  import Card from "../components/Card";
  import {mapActions, mapGetters} from 'vuex'

  export default {
      name: 'Home',
      data() {
        return {
            search: ''
        }
      },
      components: {
          Card
      },
      methods: {
          ...mapActions([
              'getCardsFromApi'
          ]),
          sort(item) {
              if(item === 'likes') {
                  return this.cardsState.sort((a, b) => a.likes < b.likes ? 1 : -1);
              }
              if(item === 'comments') {
                  return this.cardsState.sort((a, b) => a.comments < b.comments ? 1 : -1);
              }
          },
      },
      computed: {
          ...mapGetters([
              'cardsState'
          ]),
          filteredList(){
              return this.cardsState.filter(order => {
                  return order.tags.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
              })
          }
      },
      mounted() {
        this.getCardsFromApi();
      }
  }
</script>

<style lang="scss" scoped>
    .sort-block {
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        align-items: flex-end;
        margin: 20px 0;
        a {
            margin-right: 20px;
            margin-bottom: 10px;
            color: green;
            text-transform: uppercase;
            font-weight: bold;
            text-decoration: none;
        }
    }

    .input {
        width: 300px;
        margin-bottom: 10px;
        padding: 15px;
        border: 2px solid blueviolet;
        border-radius: 5px;
        outline: none;
    }

    .page {
        padding: 20px;
    }

    .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        grid-gap: 50px;
    }

</style>