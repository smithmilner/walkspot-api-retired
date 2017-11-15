const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    walkersRoutes = require('./api/routes/walkerRoutes');

app.use('/api/walkers', walkersRoutes);

app.use(function(req, res) {
  res.status(404).send({ message: req.originalUrl + ' not found' })
});

app.listen(port, function() {
    console.log('listening on port ' + port);
});