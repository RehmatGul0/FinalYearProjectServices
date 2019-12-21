import math
import os
import pandas as pd
import numpy as np
import sys

cwd = os.getcwd()
path = sys.argv[1]

dataset = pd.read_csv(cwd + path)
numeric_Columns = list(dataset._get_numeric_data().columns)
for NumericalColumn in numeric_Columns:
  dataset[NumericalColumn] = dataset[NumericalColumn].replace(0, np.nan)
dataset = dataset.fillna(dataset.mean())
dataset = dataset.round(2)
dataset.to_csv(cwd+path,index=False)
print('200')