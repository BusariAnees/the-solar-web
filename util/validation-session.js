function flashErrorsToSession (req, data, action){
    req.session.inputData = {
        hasError: true,
        ...data
    };

    req.session.save(action);
}