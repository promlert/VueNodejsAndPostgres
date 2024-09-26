<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" required v-model="car.name" name="name" />
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <vue-number v-model="car.price" class="form-control edit-form" required v-bind="number" name="price"></vue-number> 
            </div>
            <button @click="saveCar" class="btn btn-success">Submit</button>
        </div>
        <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCar">Add</button>
    </div>
    </div>
</template>
<script>
import { component as VueNumber } from '@coders-tm/vue-number-format';
import CarsDataService from "../services/CarsDataService";
export default {
    name: "add-cars",
    data() {
        return {
            car: {
                id: null,
                name: "",
                price: 0.0
            },
            number: {
            decimal: '.',
            separator: ',',
            prefix: '',
            precision: 2,
            masked: false,
            },
            submitted: false
        }
    }, 
    components: {
      VueNumber,
    },
    methods: {
        saveCar() {
            var data = {
                name: this.car.name,
                price: this.car.price
            };

            CarsDataService.create(data)
                .then(response => {
                    this.car.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newCar() {
            this.submitted = false;
            this.car = {};
        }
    }
}
</script>