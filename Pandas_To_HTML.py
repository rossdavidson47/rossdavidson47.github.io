# Dependencies and Setup
import pandas as pd
import os

# File to Load 
data_to_load = os.path.join('cities.csv')

#store into Pandas DataFrames
cities_df = pd.read_csv(data_to_load)

# render dataframe as html
html = cities_df.to_html()

#write html to file
text_file = open("data_table.html", "w")
text_file.write(html)
text_file.close()