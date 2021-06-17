const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const formidable = require('formidable');
require('dotenv/config');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const user = process.env.USER;
const pass = process.env.PASS;

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('index')
    }
)


app.post('/send', (req, res) => {
    const email = req.body.email; /*conflict with the 'form.parse' req*/
    const form = formidable({ multiples: true });
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {user: user, pass: pass}
    });
 
    form.parse(req, (err, fields, files) => {
        if (err) {
        next(err);
        return;
        }
        send(files);
        })
    function send (files) {
        transporter.sendMail({
            from: user,
            to: 'email to send',
            subject: 'Hello World',
            text: "PAPA PAPA PAPA PAPA PAPA PAPA",
            attachments: [{
                filename: files.file.name,
                path: files.file.path
            }]
        })
        .then(info=> {
            res.send('Mensagem enviada')
        }).catch(err => {
            res.send(err)
            console.log(err)
        })
    }    
});

app.listen(port, () => console.log('listening on port: ' + port))