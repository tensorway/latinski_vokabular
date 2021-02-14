#%%
qs = [[] for i in range(4)]
for i in range(4):
    with open(str(i+1)+'.txt', 'r') as infile:
        for line in infile:
            if ' - ' in line:
                try:
                    lat, hrv = line.replace('\n', '').split(' - ')
                except:
                    print(line.split(' - '))
                lat, hrv = lat.strip(), hrv.strip()
                qs[i].append([lat, hrv])