<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by title"
            v-model="name"/>
          <!-- <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchTitle"
            >
              Search
            </button>
          </div> -->
        </div>
      </div>
      <div class="col-md-6">
        <h4>Cars List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(car, index) in cars"
            :key="index"
            @click="setActiveCar(car, index)"
          >
            {{ car.name }}
          </li>
        </ul>
  
        <!-- <button class="m-3 btn btn-sm btn-danger" @click="removeAllCars">
          Remove All
        </button> -->
      </div>
      <div class="col-md-6">
        <div v-if="currentCar">
          <h4>Car</h4>
          <div>
            <label><strong>Name:</strong></label> {{ currentCar.name }}
          </div>
          <div>
            <label><strong>Price:</strong></label> {{ currentCar.price }}
          </div>
         
  
          <router-link :to="'/car/' + currentCar.id" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Cars...</p>
        </div>
        <div>
          {{publishedMessage}}
        </div>
      </div>
    </div>
  </template>
  <script>
import CarsDataService from "../services/CarsDataService";

export default {
  name: "Cars-list",
  data() {
    return {
        cars: [],
      currentCar: null,
      currentIndex: -1,
      name: ""
    };
  },
  computed: {
    // a computed getter
    publishedMessage() {
      // `this` points to the component instance
     // this.name = 'sample';
      return "Test"+this.name;
    }
  },
  methods: {
    retrieveCars() {
        CarsDataService.getAll()
        .then(response => {
          this.cars = response.data.rows;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveCars();
      this.currentCar = null;
      this.currentIndex = -1;
    },
    setActiveCar(car, index) {
      this.currentCar = car;
      this.currentIndex = car ? index : -1;
      this.name = car.name;
    }
  },
    mounted() {
    this.refreshList();
  }
}

</script>
<style>
    .list {
      text-align: left;
      max-width: 750px;
      margin: auto;
    }
    </style>