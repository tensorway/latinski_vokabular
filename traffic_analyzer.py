#%% 
import os
from datetime import datetime
os.system('wget -O data.txt http://18.191.201.204/latin/api/analytics123456789')
datalist = []
with open('data.txt', 'r') as infile:
    for line in infile:
        t, q, a, l, dt = line.replace('\n', '').split('---')
        if int(t)//1000 < 1613387482: #feb 15 12:12
            continue
        date = datetime.utcfromtimestamp(int(t)//1000)
        datalist.append( {'date':date, 'question':q, 'answer':a, 'label':l, 'dt':dt} )
datalist
#%%
print("total number of entries: ", len(datalist))

#%%
labels = ['lose', 'ok', 'super']
labelcnt= [0, 0, 0]
for item in datalist:
    for i, lbl in enumerate(labels):
        if item['label'] == lbl:
            labelcnt[i] += 1
#%%
import datetime
import matplotlib.pyplot as plt

x = [item['date'] for item in datalist]
y = list(range(len(x)))

plt.subplot(1, 3, 1)
plt.plot(x, y)
plt.gcf().autofmt_xdate()

plt.subplot(1, 3, 2)
plt.bar(list(range(len(labelcnt))), labelcnt, tick_label=labels)
plt.show()