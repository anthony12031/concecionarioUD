var nodemailer = require('nodemailer');

function enviarCorreo(datos){
    var transporter = nodemailer.createTransport({
    service: datos.service,
    auth: {
      user: datos.from,
      pass: datos.pass
    }
  });

  var mailOptions = {
    from: datos.sender,
    to: datos.to,
    subject: datos.subject,
    text: datos.mensaje
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

module.exports = enviarCorreo;
