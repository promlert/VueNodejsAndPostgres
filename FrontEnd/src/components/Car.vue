<template>
    <div v-if="currentCar" class="edit-form">
        <h4>Car</h4>
        <form>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control edit-form" id="name" required v-model="currentCar.name" name="name" />
            </div>
            <div class="form-group">
                <label for="price">Price</label>
                <vue-number v-model="currentCar.price" class="form-control edit-form" required v-bind="number" name="price"></vue-number> 
                <!-- <input type="text" class="form-control edit-form" id="price" required v-model="currentCar.price" name="price" /> -->
            </div>
            <button type="button" class="badge badge-danger mr-2" @click="deleteCar">
                Delete
            </button>

            <button type="button" class="badge badge-success" @click="updateCar">
                Update
            </button>

            <button type="button" class="badge badge-success" @click="redirect('/cars')">
                Back
            </button>
        </form>
        <p>{{ message }}</p>
    </div>
    <div v-else>
        <br />
        <p>Please click on a Car...</p>
    </div>
</template>
<script>
import { component as VueNumber } from '@coders-tm/vue-number-format';
import CarsDataService from "../services/CarsDataService";
export default {
    name: "detail-cars",
    data() {
        return {
            currentCar: null,
            message: '',
            number: {
            decimal: '.',
            separator: ',',
            prefix: '',
            precision: 2,
            masked: false,
            },
        }
    },
    components: {
      VueNumber,
    },
    methods: {
        getCar(id) {
            CarsDataService.get(id)
                .then(response => {
                    this.currentCar = response.data.rows[0];
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        redirect: function(path) {
            this.$router.push({ path });
        },
        updateCar() {
            CarsDataService.update(this.currentCar)
                .then(response => {
                    console.log(response.data.rows);
                    this.message = 'The currentCar was updated successfully!';
                })
                .catch(e => {
                    console.log(e);
                });
        },
        deleteCar() {
            console.log(this.currentCar.id);
            CarsDataService.delete(this.currentCar.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "carslist" });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },

    mounted() {
        this.message = '';
        this.getCar(this.$route.params.id);
    }

}
</script>

<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>