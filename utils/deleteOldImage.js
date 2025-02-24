
const fs =require('fs');
const path =require('path');

function deleteManyOldImage(imagePath){
    imagePath.map(item=>{
    const fullImagePath = path.join(item);
    fs.unlink(fullImagePath,(error)=>{
        if (error) {
            console.log("Wrong prosses");
        }else{
            console.log("Old image delete successfull");
            
        }
    })
    })
    
}


function deleteSingleOldImage(imagePath) {
    if (!imagePath) {
        console.log("Error: imagePath is undefined or empty");
        return; // Funksiyanı dayandır
    }

    const fullImagePath = path.join(imagePath);
    fs.unlink(fullImagePath, (error) => {
        if (error) {
            console.log("Wrong process:", error);
        } else {
            console.log("Old image delete successful");
        }
    });
}


module.exports = {deleteManyOldImage, deleteSingleOldImage}