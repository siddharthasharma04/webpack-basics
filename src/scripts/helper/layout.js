const Handlebars = require("handlebars");
const fs = require("fs");
module.exports = function (options) {
  let returning = options.fn(this);
  const metaData = { ...options.hash };
  try {
    var layout = fs.readFileSync("src/templates/layout/default.hbs");
    let compiled = Handlebars.compile(layout.toString()); 
    returning = `${compiled({
      body: options.fn(this),
      dir: metaData.dir === "rtl" ? "rtl" : "ltr",
      title: metaData.title || "WELCOME || PAGE",
      lang:metaData.lang || 'en'
    })}`;
  } catch (e) {
    console.log("Error:", e.stack);
    returning = `<h2>ERROR:</h2><pre>${e.stack}</pre>`;
  }
  // return `${compiled({d:"Sid"})} ${txt}`.toUpperCase();
  // return options.fn(this);
  return returning;
};
