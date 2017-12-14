# -*- coding: utf-8 -*-
from utils.commonUtil import fileToObj

EXAMPLE = """
5
7
1 2 10
1 4 30
1 5 100
2 3 50
3 5 10
4 3 20
4 5 60
输出数据:
999999 10 999999 30 100
10 999999 50 999999 999999
999999 50 999999 20 10
30 999999 20 999999 60
100 999999 10 60 999999
源点到最后一个顶点的最短路径长度: 60
源点到最后一个顶点的路径为: 1 -> 4 -> 3 -> 5
"""

MAXINT = 9999999

lineList = []
stationList = []
stationListMap = {}
distanceMap = [] # 两点间的长度

def getShortest(total, visited, distances):
	min = MAXINT
	shortest = -1
	
	for i in range(0, total):
		if not visited[i] and distances[i] < min:
			min = distances[i]
			shortest = i
				
	return shortest


def dijkstra(station):
	
	stationCount = len(stationList)
	visited = []
	distance = []  # 当前节点到源点的距离
	prevNode = {}  # 当前节点的前一节点
	distances = []  # 到下一点的距离
	
	start = station["position"]
	
	# init something
	for i in range(0, stationCount):
		visited.append(False)
		distances.append(MAXINT)
	
	for i in range(0, stationCount):
		distances[i] = distanceMap[start][i]
		if i != start and distances[i] < MAXINT:
			prevNode[i] = start
		else:
			prevNode[i] = -1
	
	while True:
		latest = getShortest(stationCount, visited, distances)
		if latest == -1:
			break
			
		visited[latest] = True
		for i in range(0, stationCount):
			if not visited[i] and distanceMap[latest][i] != MAXINT and distances[latest] + distanceMap[latest][i] < distances[i]:
				distances[i] = distances[latest] + distanceMap[latest][i]
				prevNode[i] = latest
	
	print(distanceMap)
	print(distances)
	print(prevNode)
	

def getPrevStation(line, station):
	index = line["stations"].index(station)
	if index == 0:
		return None
	return line["stations"][index - 1]
	
	
def getNextStation(line, station):
	index = line["stations"].index(station)
	if index == len(line["stations"]) - 1:
		return None
	return line["stations"][index + 1]


if __name__ == "__main__":
	lineList = fileToObj("./subway.json")
	i = 0
	
	for line in lineList:
		for station in line["stations"]:
			position = line["stations"].index(station)
			if not position:
				station["prevLength"] = 0
			else:
				station["prevLength"] = line["stations"][position - 1]["length"]
				
	for line in lineList:
		for station in line["stations"]:
			oldStation = stationListMap.get(station["name"])
			prevStation = getPrevStation(line, station)
			nextStation = getNextStation(line, station)
			
			if oldStation: # station already in MAP
				oldStation["lineIds"].append(line["id"])
				if nextStation:
					oldNextStation = stationListMap.get(nextStation["name"])
					if oldNextStation:	# 该下一跳站点已通过其他线路，添加到队列中
						subStation = {
							"station": oldNextStation["position"],
							"length": station["length"]
						}
					else:
						subStation = {
							"station": oldStation["position"] + 1,
							"length": station["length"]
						}
					oldStation["subStations"].append(subStation)

				if prevStation:
					oldPrevStation = stationListMap.get(prevStation["name"])
					if oldPrevStation == prevStation: # 前趋站点已加入队列
						subStation = {
							"station": prevStation["position"],
							"length": station["prevLength"]
						}
					else: # 前趋站点已通过其他线路加入队列
						subStation = {
							"station": oldPrevStation["position"],
							"length": prevStation["length"]
						}
					oldStation["subStations"].append(subStation)
			else: # 该站点首次被录入
				station["lineIds"] = [line["id"]]
				station["subStations"] = []
				station["position"] = i
				i = i + 1
				stationListMap[station["name"]] = station
				stationList.append(station)
				
				if nextStation:
					oldNextStation = stationListMap.get(nextStation["name"])
					if oldNextStation: 	# 该下一跳站点已通过其他线路，添加到队列中
						subStation = {
							"station": oldNextStation["position"],
							"length": station["length"]
						}
					else: # 该下一跳站点尚未被录入
						subStation = {
							"station": station["position"] + 1,
							"length": station["length"]
						}
					station["subStations"].append(subStation)
						
				if prevStation:
					oldPrevStation = stationListMap.get(prevStation["name"])
					subStation = {
						"station": oldPrevStation["position"],
						"length": station["prevLength"]
					}
					station["subStations"].append(subStation)
				
	stationCount = len(stationList)

	for i in range(0, stationCount):
		temp = []
		for j in range(0, stationCount):
			if i == j:
				temp.append(0)
			else:
				temp.append(MAXINT)
		distanceMap.append(temp)
		
	for station in stationList:
		for subConfig in station["subStations"]:
			subStation = stationList[subConfig["station"]]
			length = subStation["length"]
			distanceMap[station["position"]][subStation["position"]] = length
		
	station = stationListMap.get("五道口")
	print(station["name"])
	dijkstra(station)

	print("Running in dijkstra")