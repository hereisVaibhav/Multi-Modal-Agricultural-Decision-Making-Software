import pandas as pd
from tqdm.auto import tqdm

# Mock dataset creation

# Define plant data
plant_data = {
    'Plant': ['Aloe Vera', 'Tomato', 'Basil', 'Cucumber', 'Rose'],
    'Optimal Temperature Range (C)': [(18, 24), (20, 26), (10, 21), (16, 23), (15, 25)],
    'Base Water Requirement (L/day)': [0.3, (0.89, 2.31), 0.2, 0.6, 0.4],
    'Temperature Adjustment Factor': [0.02, 0.03, 0.01, 0.025, 0.02],
    'Base Nutritional Requirement (g/day)': [{'Nitrogen': 1, 'Phosphorus': 0.5, 'Potassium': 0.3},
                                             {'Nitrogen': 2, 'Phosphorus': 1, 'Potassium': 0.8},
                                             {'Nitrogen': 0.5, 'Phosphorus': 0.3, 'Potassium': 0.2},
                                             {'Nitrogen': 1.5, 'Phosphorus': 0.8, 'Potassium': 0.5},
                                             {'Nitrogen': 1, 'Phosphorus': 0.6, 'Potassium': 0.4}],
    'Nutritional Adjustment Factor': [0.05, 0.06, 0.03, 0.07, 0.05],
    
}

# Create DataFrame
plants_df = pd.DataFrame(plant_data)

# Display the head of the DataFrame
tqdm.pandas()
print(plants_df.head())


def calculate_requirements(plant_name, current_temp, plants_df):
    # Find the plant in the dataset
    plant_info = plants_df[plants_df['Plant'] == plant_name].iloc[0]
    optimal_range = plant_info['Optimal Temperature Range (C)']
    base_water = plant_info['Base Water Requirement (L/day)']
    temp_factor = plant_info['Temperature Adjustment Factor']
    base_nutrition = plant_info['Base Nutritional Requirement (g/day)']
    nutrition_factor = plant_info['Nutritional Adjustment Factor']

    # Check if current temperature is within the optimal range
    if optimal_range[0] <= current_temp <= optimal_range[1]:
        # No adjustment needed
        return {'Water': base_water, 'Nutrition': base_nutrition}
    else:
        # Calculate the difference from the optimal range
        if current_temp < optimal_range[0]:
            temp_diff = optimal_range[0] - current_temp
        else:
            temp_diff = current_temp - optimal_range[1]

        # Adjust water and nutrition requirements based on the temperature difference
        adjusted_water = base_water + (temp_diff * temp_factor)
        adjusted_nutrition = {nutrient: value + (temp_diff * nutrition_factor) for nutrient, value in base_nutrition.items()}
        return {'Water': adjusted_water, 'Nutrition': adjusted_nutrition}

# Test the function with an example
plant_name = 'Tomato'
current_temp = 30 # degrees Celsius

# Call the function and print the result
requirements = calculate_requirements(plant_name, current_temp, plants_df)
print(f'Requirements for {plant_name} at {current_temp}C: Water - {requirements["Water"]} L/day')
print(f'Nutrition - {requirements["Nutrition"]}')
