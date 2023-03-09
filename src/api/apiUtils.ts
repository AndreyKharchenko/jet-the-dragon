export const serializeToQuery = <TObj extends object>(obj : TObj) : string  => {

    var str = [];
    for (var key in obj){
        if (!obj.hasOwnProperty(key))
            continue;

        const value = obj[key]
        if (value === undefined || value === "")
            continue;

        if (typeof value === "string" || typeof value === 'number' || typeof value === 'boolean')
            str.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
    
    console.log(JSON.stringify(obj))
    console.log(`?${str.join("&")}`)


    if(str.length > 0) {              
        return `?${str.join("&")}`
    }
    
    return ''
}