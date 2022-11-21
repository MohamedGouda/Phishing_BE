exports.validateTargetData = (targetDate) => {
    return (validateEmail(targetDate.email) && validateName(targetDate.name)) ? true : false
}

const validateEmail = (email) => {
    return (String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) && String(email).length <= 254);
};

const validateName = (name) => {
    return name.length <= 50
}