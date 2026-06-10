import pandas as pd
import numpy as np
from tqdm.auto import tqdm

# Mock dataset creation

# Define plant data
plant_data = {
    'Plant': ['Aloe Vera', 'Tomato', 'Basil', 'Cucumber', 'Rose', 'Lavender', 'Sunflower', 'Daisy', 'Cherry', 'Mint', 'Zinnia'],
    'Optimal Temperature Range (C)': [(13, 27), (20, 26), (27, 32), (23, 29), (15, 28), (20, 30), (20, 250), (15, 23), (20, 28), (15, 25), (21, 29)],
    'Base Water Requirement (L/day)': [0.3, (0.89, 2.31), 0.2, (0.25, 0.9), 10, 1, 7.57, 0.4, 0.6, 10, 0.35],   
    'Base Nutritional Requirement (g/day)': [
        {'Nitrogen': (2,4), 'Phosphorus': (0.5,1), 'Potassium': (3,5), 'Calcium': (2,4)},
        {'Nitrogen': (3, 4), 'Phosphorus': (2, 3), 'Potassium': (4, 6), 'Calcium': (3,5)},
        {'Nitrogen': (3,4), 'Phosphorus': (1,2), 'Potassium': (3,5), 'Calcium': (2,3)},
        {'Nitrogen': (3,4), 'Phosphorus': (1,2), 'Potassium': (3,5), 'Calcium': (2,3)},
        {'Nitrogen': (5,6), 'Phosphorus': (3,4), 'Potassium': (4,5), 'Calcium': (3,4)},
        {'Nitrogen': (2,3), 'Phosphorus': (1,2), 'Potassium': (3,4), 'Calcium': (2,3)},
        {'Nitrogen': (4,5), 'Phosphorus': (2,3), 'Potassium': (4,5), 'Calcium': (3,4)},
        {'Nitrogen': 1, 'Phosphorus': 0.6, 'Potassium': 0.4, 'Calcium': 0.3},
        {'Nitrogen': 1.8, 'Phosphorus': 1.2, 'Potassium': 0.7, 'Calcium': 0.5},
        {'Nitrogen': 0.7, 'Phosphorus': 0.4, 'Potassium': 0.3, 'Calcium': 0.2},
        {'Nitrogen': 1.5, 'Phosphorus': 0.9, 'Potassium': 0.6, 'Calcium': 0.4},
    ],
    'Nutritional Adjustment Factor': [0.05, 0.06, 0.03, 0.07, 0.05, 0.04, 0.08, 0.06, 0.08, 0.03, 0.04],
    'ph Requirment' : [(4.5, 5.5), (6.2, 6.8), (5.6, 6.4), (5.5, 6.5), (6.5), (6.7, 7.3), (6.0, 6.8), (6.0, 8.0), (6.5, 6.7), (6.5, 7.0), (5.5, 7.5)]
}

# Create DataFrame
plants_df = pd.DataFrame(plant_data)

# Display the head of the DataFrame
tqdm.pandas()
print(plants_df.head())


# Test the function with an example
plant_name = 'Tomato'
current_temp = 30  # degrees Celsius

# Find the plant in the dataset
plant_info = plants_df[plants_df['Plant'] == plant_name].iloc[0]
optimal_range = plant_info['Optimal Temperature Range (C)']
base_water = plant_info['Base Water Requirement (L/day)']
base_nutrition = plant_info['Base Nutritional Requirement (g/day)']
nutrition_factor = plant_info['Nutritional Adjustment Factor']
ph_requirment = plant_info['ph Requirment']




def calculate_requirements(plant_name, current_temp, plants_df):
    
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

        # Adjust water, nutrition, and wind requirements based on the temperature difference
        
        

        




# Define the optimal temperature range and base water requirement range for tomato plants

optimal_temp_range = optimal_range
base_water_range = base_water

# Define the temperature of interest
ct = current_temp

# Assuming a linear relationship between temperature and water requirement outside the optimal range
# Calculate the slope of the line
slope = (base_water_range[1] - base_water_range[0]) / (optimal_temp_range[1] - optimal_temp_range[0])

# Calculate the base water requirement at 30 C
# Since 30 C is outside the optimal range, we will use the higher end of the base water range
base_water_at = base_water_range[1] + slope * (current_temp - optimal_temp_range[1])

print(f'Base water requirement for a tomato plant at {current_temp} C:', base_water_at)
print(f'pH requirment of {plant_name} is in between {ph_requirment}')




# Call the function and print the result
requirements = calculate_requirements(plant_name, current_temp, plants_df)
print(f'Requirements for {plant_name} at {current_temp}C:')

if(plant_name == 'Aloe Vera'):
    print(f'Note :- Aloe plants are succulents, so they don’t need a lot of water. They’ll start to rot if you overwater them. So, how often should you water your aloe plant? Once per week should be plenty unless the plant is in a very hot, dry environment. Then you may need to water it twice a week. Make sure the soil is completely dry before watering again.')

if(plant_name == "Lavender"):
    print(f' Note:- Potted lavenders will need to be watered once every two weeks during the growing season with around 35 ounces of water (1 liter) if there has been no rainfall and persistent sunshine.')

if(plant_name == "Sunflower"):
    print(f'Note:- Due to their rapid growth, they need a minimum of 2 gallons, (7.57 Litres) a week. More in their early stages of growth. This will prevent weak stems and other issues.')
