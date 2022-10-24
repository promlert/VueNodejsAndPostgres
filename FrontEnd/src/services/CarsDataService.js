// import http from "../http-common";
import api from "./api";
class CarsDataService {
    getAll() {
        return api.get("/cars/");
      }
      get(id) {
        return api.get(`/cars/${id}`);
      }
    
      create(data) {
        return api.post("/cars", data);
      }
      update(data) {
        return api.put("/cars", data);
      }
      delete(id) {
        return api.delete(`/cars/${id}`);
      }
}

export default new CarsDataService();