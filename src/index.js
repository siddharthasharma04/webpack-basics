// import STYLEs
import "./styles/main.scss";

// import Scripts
import $ from 'jquery';  
// const $ = window.jQuery;  

import {Modal} from "./scripts/components";

const button = $(".btn:first");

const m = new Modal(button);

// m.logMe("Hola!!")


if (process.env.NODE_ENV !== "production") {
  console.log("%cDevelopment mode","font-weight:900;font-family:'Arial';font-size:24px;color:cyan;padding:20px 50px;text-shadow:3px 3px 5px rgba(190,0,123,0.8);");
}