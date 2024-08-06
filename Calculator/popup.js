document.getElementById('addButton').addEventListener('click', function() {
    // Get the values from the input fields
    const num1 = parseInt(document.getElementById('num1').value, 10);
    const num2 = parseInt(document.getElementById('num2').value, 10);
  
    // Check if the inputs are valid integers
    if (isNaN(num1) || isNaN(num2)) {
      document.getElementById('result').textContent = 'Please enter valid integers.';
    } else {
      // Calculate the sum
      const sum = num1 + num2;
  
      // Display the result
      document.getElementById('result').textContent = 'Sum: ' + sum;
    }
  });
  