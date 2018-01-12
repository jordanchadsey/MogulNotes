import axios from "axios";

export default {
  findAll: function (){
    return axios.get("/articles");
  },
  findOne: function (id) {
    return axios.get("/articles/"+id);
  },

  scrape: function () {
    return axios.get ("/scrape");
  },

  save: function () {
    return axios.post("/articles");
  },

  addNote: function (id) {
    return axios.post("/articles"+id)
  }

};
