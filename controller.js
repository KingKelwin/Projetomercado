//constantes

const express=require('express');
const bodyParser=require('body-parser');
const mercadopago=require('mercadopago');
const cors=require('cors');
const config=require('./config/index.json');


let app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mercadopago.configure({
access_token: config.token});



//Routes
app.post('/',(req, res) => {
  let preference = {

    items: [{
    title: 'Blue shirt',
    quantity: 1,
    currency_id: 'BRL',
    unit_price: 40.67
  }],
  
  payer: {
    email: "demo@mail.com"
  },
  payment_methods:{
    installments:3
  },
  back_urls:{
    failure:"https://www.minecraft.net/pt-br",
    pending:"https://www.leagueoflegends.com/pt-br/",
    succes:"https://store.steampowered.com/app/268910/Cuphead/"
  }

  }

  
    mercadopago.preferences.create(preference).then(function (data) {
       res.send(JSON.stringify(data.response.sandbox_init_point));
     }).catch(function (error) {
       console.log(error);
     });
})



//Iniciar Servidor
let port=process.env.PORT || 3000;
app.listen(port,(req, res) => {
    console.log('Servidor Rodando')
})
