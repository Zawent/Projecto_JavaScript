const url = "https://api-colombia.com/api/v1/Country/Colombia"
fetch(url)
.then(respuesta => respuesta.json())
.then(info => {
    console.log(info)
})
