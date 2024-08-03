def day1():
    l =[]
    num=[]
    with open('text.txt', 'r') as readfile:
        a = readfile.readlines()
    for line in a:
        l.append(line)
    for x in l: 
        d=''
        for i in x: 
            if i.isdigit():
                d+=i
        if len(d)<2:
            d+=d
        if len(d)>2:
            d=d[0]+d[-1]
        num.append(int(d))          
    print(sum(num))

