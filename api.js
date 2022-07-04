const bodyParser = require('body-parser');
const express = require('express');
const { uuid } = require('uuidv4');
const app = express();

const port = process.env.PORT || 3000;

let id = 0;

const dataPesanan = []
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(dataPesanan);
});

app.post('/', (req, res) => {
    const data = req.body
    console.log(data);
    dataPesanan.push({id: uuid(), ...data});
    res.send("Berhasil nge-post");
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;

    const data = dataPesanan.find(data => data.id == id)
    if (data) {
        dataPesanan.splice(dataPesanan.indexOf(data), 1);
    }

    console.log(dataPesanan);

    res.send('Berhasil hapus data dengan id ${id}');
});

app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { image, jam, harga, estimasi, namabis, tipebis, tujuan } = req.body;
    const data = dataPesanan.find((data) => data.id == id);
    if (image) data.image = image;
    if (jam) data.jam = jam;
    if (harga) data.harga = harga;
    if (estimasi) data.estimasi = estimasi;
    if (namabis) data.namabis = namabis;
    if (tipebis) data.tipebis = tipebis;
    if (tujuan) data.tujuan = tujuan;

    console.log('dataPesanan', dataPesanan);

    res.send('Berhasil Update data dengan id ${id}');
})

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);

});