import React from "react";
import axios from "axios";

export default function PCBAInventoryData() {
  axios({
    method: "Get",
    URL: "http://172.22.9.61:8888/api/NewSn?",
    params: {
      Lot: "000001585100/000272",
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
