
function sessionErrorData (req,defaultvalues){

    let sessionInputData = req.session.inputData;

    if(!sessionInputData){
        sessionInputData = {
            hasError: false,
            ...defaultvalues,
        };
    }
    
    req.session.inputData = null;
    return sessionInputData;


}




function flashErrorsToSession (req, data, action){
    req.session.inputData = {
        hasError: true,
        ...data,
    
    };
    req.session.save(action);
}

module.exports = {
    flashErrorsToSession: flashErrorsToSession,
    sessionErrorData: sessionErrorData,
}