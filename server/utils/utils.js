module.exports =  {
    formatTimeToString(digit) {
        if (digit < 10) 
            return '0' + digit;
        return digit;
    }
}

