const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

app.use(cors())

app.get('/cat-balance', (req, res) => {
  console.log(req.query);
  const { nome } = req.query;
  const peso = parseFloat(req.query.peso);
  const ano = parseInt(req.query.ano);
  const mes = parseInt(req.query.mes);
  const mesesTotais = (ano * 12) + mes;
  let volume = '';
  let classificacao_etaria = '';
  let porte = '';

  if([0, 1].includes(mesesTotais)) {
    res.send('Veterinários recomendam que até 45 - 50 dias de vida devem receber amamentação. Procure um médico veterinário.');
    return;
  } else if (mesesTotais > 1 && mesesTotais < 13) {
    classificacao_etaria = 'filhote';
    const resp = getFilhoteResp(mesesTotais);
    volume = resp.volume;
    porte = resp.porte;
  } else if (mesesTotais > 12 && mesesTotais < (7 * 12)) {
    classificacao_etaria = 'adulto';
    const resp = getAdultoResp(peso);
    volume = resp.volume;
    porte = resp.porte;
  } else {
    classificacao_etaria = 'idoso';
    const resp = getIdosoResp(peso);
    volume = resp.volume;
    porte = resp.porte;
  }

  res.send({message: `${nome} é um gato ${classificacao_etaria} ${porte ? `de ${porte} porte` : ''} e recomenda-se que receba de ${volume} de ração diariamente.`});
})

function getFilhoteResp(mesesTotais) {
  if ([2].includes(mesesTotais)) {
    return {volume: '40g a 50g', porte: null};
  }
  if ([3, 4].includes(mesesTotais)) {
    return {volume: '50g a 60g', porte: null};
  }
  if ([5, 6].includes(mesesTotais)){
    return {volume: '60g a 70g', porte: null};
  }
  if (mesesTotais < 12 && mesesTotais > 6){
    return {volume: '70g a 80g', porte: null};
  }
}

function getAdultoResp(peso) {
  if (peso < 5) {
    return {volume: '40g a 55g', porte: 'pequeno'};
  }
  return {volume: '55g a 75g', porte: 'grande'};
}

function getIdosoResp(peso) {
  if (peso < 5) {
    return {volume: '45g a 60g', volume: 'pequeno'};
  }
  return {volume: '60g a 75g', porte: 'grande'};
  
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})