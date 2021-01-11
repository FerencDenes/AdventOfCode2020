rulesSection = True
ruleMap = {}

stack = []


class Rule:
    def __init__(self, id, rule):
        self.id = id
        self.rules = []
        for r in rule.split(' | '):
            terms = r.split(' ')
            self.rules.append(terms)

    def isMatch(self, s, pos):
        for rule in self.rules:
            pos2 = pos
            for ref in rule:
                if pos2 >= 0:
                    pos2 = ruleMap[ref]
            if pos2 < 0:
                return pos2

    def getMatch(self):
        ret = []
        for r in self.rules:
            match = []
            for clause in r:
                cls = ruleMap[clause].getMatch()
                if len(match) == 0:
                    match = cls
                else:
                    m2 = []
                    for m in match:
                        for cl in cls:
                            m2.append(m+cl)
                    match = m2
            for m in match:
                ret.append(m)
        return ret


class TermRule(Rule):
    def __init__(self, id, ch):
        self.id = id
        self.ch = ch

    def isMatch(self, s, pos):
        return pos+1 if s[pos] == self.ch else -1

    def getMatch(self):
        return [self.ch]


matches = set()
matches42 = set()
matches31 = set()

cnt = 0
cnt2 = 0
for line in open("input.txt", "r"):
    strippedLine = line.rstrip()
    # print(strippedLine)
    if strippedLine == '':
        rulesSection = False
        matches = set(ruleMap['0'].getMatch())
        matches42 = set(ruleMap['42'].getMatch())
        matches31 = set(ruleMap['31'].getMatch())
    elif rulesSection:
        [id, rule] = strippedLine.split(": ")
        if rule[0] == '"':
            ruleMap[id] = TermRule(id, rule[1])
        else:
            ruleMap[id] = Rule(id, rule)
    else:
        if strippedLine in matches:
            cnt += 1
        if len(strippedLine) % 8 == 0:
            i = 0
            cnt42 = 0
            cnt31 = 0
            while i < len(strippedLine):
                if strippedLine[i:i+8] in matches42 and cnt31 == 0:
                    cnt42 += 8
                elif strippedLine[i:i+8] in matches31:
                    cnt31 += 8
                i += 8
            if cnt31+cnt42 == len(strippedLine) and cnt31 < cnt42 and cnt31 > 0:
                cnt2 += 1


print(len(matches), len(matches42), len(matches31))
# print(matches31)
# print(matches42)
ins = matches31.intersection(matches42)
print(ins)

print(cnt)
print(cnt2)
