const files = require.context('./charts', false, /\.js$/)
const charts = {}

files.keys().forEach(key => {
    charts[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default {
    charts
}