if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
    // .then((reg) => console.log('Servie worker registered', reg))
    .then((reg) => console.log('Servie worker registered'))
    .catch((error) => console.log('Servie worker registered', error))
}