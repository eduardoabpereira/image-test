const express = require('express');
const nodeHtmlToImage = require('node-html-to-image');
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get(`/image`, async function (req, res) {

  const fs = require('fs')
  const html = await fs.readFileSync('./index.html', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log(data);
  });

  const image = await nodeHtmlToImage({
    html,
    content: {
      date: '21/08/2020',
      transactionCode: 'abcdef564564abcdef',
      payerName: 'company name',
      payerDocument: 'xx.xxx.xxx/xxxx-xx',
      amount: 'R$ 1000.00',
      description: 'teste',
      beneficiaryName: 'eduardo',
      beneficiaryDocument: 'xxx.xxx.xxx-xx',
      beneficiaryBank: 'testee',
      beneficiaryAgency: 'xxxx',
      beneficiaryAccount: 'xxxxx-x',
      beneficiaryAccountType: 'Conta Corrente',
    },
    puppeteerArgs: {
      defaultViewport: {
        width: 1080,
        height: 800,
      },
    },
  });

  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'binary');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


