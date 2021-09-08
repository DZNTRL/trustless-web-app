var fs = require("fs")

fs.writeFileSync("./change.stamp", new Date().toString())
