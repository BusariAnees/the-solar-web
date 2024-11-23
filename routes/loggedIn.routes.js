const express = require('express');



const router  = express.Router();

router.get('/loggedIn-profile', function(req, res) {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';

   const formattedTime = `${hours}:${minutes}:${seconds} ${period}` ;

    res.render('admin/loggedIn-profile',
    {currentTime: `${formattedTime}`});
});


module.exports = router;