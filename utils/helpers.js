module.exports = {
    health_bar: (health) => {
        var canvas = document.getElementById('canvas');
        canvas.width = 400;
        canvas.height = 400;
        var context = canvas.getContext('2d');  
        canvas.width = canvas.width;
    
        // Calculate health bar percent
        var percent = health / maxHealth;
    
        context.fillStyle = "Red";
        context.font = "18px sans-serif";
        context.fillText("Life " +health+"/"+maxHealth+" = " + percent * 100 +"%", 20, 20);
    
        context.fillStyle = "black";
        context.fillRect(object1.x, object1.y, object1.width, object1.height);
    
        context.fillStyle = "red";
        context.fillRect(object1.x, object1.y, object1.width * percent, object1.height);


    },   
}