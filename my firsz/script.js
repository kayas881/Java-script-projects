function calculateBMI(){
    var heightInput = document.getElementById("height");
    var weightInput = document.getElementById("weight");
    var resultDiv = document.getElementById("result");
    
    
    var height = parseFloat(heightInput.value);
    var weight = parseFloat(weightInput.value);


    if (isNaN(height) || isNaN(weight) ){
        resultDiv.innerHTML = "please enter valid height and weight.";
        return;
    }

    var bmi = weight / ((height/100)**2);
    var category = "";

    if (bmi < 18.5){
        category = "Underweight";
    } else if(bmi <25){
        category = "normar weight";
    } else if (bmi < 30) {
        category= "overweight"
    } else {
        category = "obese";
    }

    resultDiv.innerHTML = "your BMI is" + bmi.toFixed(2)+ "("+ category +")";
    

}
