const express = require('express');
const si = require('systeminformation');


const app = express();

app.use(express.json());

app.set('view engine', 'pug');

app.get('/', async (req, res) => {

  const { cores } = await si.cpu();
  const interfaces = await si.networkInterfaces();
  const nwDefault = await si.networkInterfaceDefault();

  const { ip4 } = interfaces.find(i => i.iface === nwDefault ) || {};
  const { total } = await si.mem();

  const totalMem = Math.ceil(total / 1024 / 1024 / 1024)

  console.log({ cores, ip4, totalMem, nwDefault })

  res.render('index', { cores, ip4, totalMem });
});

app.listen(3000, (err) => {
  if (err) throw err;

  console.log('Server started at http://localhost:3000');
});
