import numpy as np

# Define the optimal temperature range for tomatoes
optimal_temp_range = (18, 25)

# Define a function to calculate the temperature adjustment factor
# This is a simple placeholder function and the actual calculation may vary depending
# on the specific context or model used for temperature adjustment

def calculate_temp_adjustment_factor(temp, optimal_range):
    # If the temperature is within the optimal range, no adjustment is needed
    if optimal_range[0] <= temp <= optimal_range[1]:
        return 
    # If the temperature is below the optimal range
    elif temp < optimal_range[0]:
        # Calculate the adjustment factor as a function of the difference
        return np.exp(-(optimal_range[0] - temp))
    # If the temperature is above the optimal range
    else:
        # Calculate the adjustment factor as a function of the difference
        return np.exp(-(temp - optimal_range[1]))

# Example temperature to calculate the adjustment factor for
example_temp = 30
adjustment_factor = calculate_temp_adjustment_factor(example_temp, optimal_temp_range)

print('Temperature Adjustment Factor for', example_temp, 'C is:', adjustment_factor)