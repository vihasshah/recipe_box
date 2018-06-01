
// convert csv to list 
export const csvToList = (csvStr) => {
    let list = []
    let csv_to_array = csvStr.trim().split(',');
    csv_to_array.map((item) => {
        if(item.length > 0){ 
            list.push(item)
        }
    }); 
    return list;
}