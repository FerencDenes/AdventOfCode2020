pks = [15733400, 6408062]
#pks = [5764801, 17807724]

loop = 1
loopSize = [0, 0]
found = 0
val = 7
while found < 2:
    for i in [0, 1]:
        if val == pks[i]:
            loopSize[i] = loop
            found += 1
    val = (val*7) % 20201227
    loop += 1
val = pks[1]
for i in range(0, loopSize[0]-1):
    val = (val*pks[1]) % 20201227
print(val)
