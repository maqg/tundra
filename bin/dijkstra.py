# -*- coding: utf-8 -*-
import json

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
distanceMap = {}  # 两点间的长度


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
	prevNodes = {}  # 当前节点的前一节点
	distances = []  # 到下一点的距离
	
	start = station["position"]
	
	# init something
	for i in range(0, stationCount):
		visited.append(False)
		distances.append(MAXINT)
	
	for i in range(0, stationCount):
		distances[i] = distanceMap.get("%d-%d" % (start, i)) or MAXINT
		if i != start and distances[i] < MAXINT:
			prevNodes[i] = start
		else:
			prevNodes[i] = -1
	
	while True:
		latest = getShortest(stationCount, visited, distances)
		if latest == -1:
			break

		visited[latest] = True
		for i in range(0, stationCount):
			dist = distanceMap.get("%d-%d" % (latest, i)) or MAXINT
			if not visited[i] and dist != MAXINT and distances[latest] + dist < distances[i]:
				distances[i] = distances[latest] + dist
				prevNodes[i] = latest
	
	print(json.dumps(distances, indent=4))
	print(json.dumps(prevNodes, indent=4))

	return (distances, prevNodes)


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


def getStationList(prevNodes, start, end):
	pathList = []

	prevStation = prevNodes[end]
	while prevStation != -1 and prevStation != start:
		pathList.insert(0, stationList[prevStation])
		prevStation = prevNodes[prevStation]

	pathList.insert(0, stationList[start])
	pathList.append(stationList[end])

	return pathList


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
			
			if oldStation:  # station already in MAP
				oldStation["lineIds"].append(line["id"])
				if nextStation:
					oldNextStation = stationListMap.get(nextStation["name"])
					if oldNextStation:  # 该下一跳站点已通过其他线路，添加到队列中
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
					if oldPrevStation == prevStation:  # 前趋站点已加入队列
						subStation = {
							"station": prevStation["position"],
							"length": station["prevLength"]
						}
					else:  # 前趋站点已通过其他线路加入队列
						subStation = {
							"station": oldPrevStation["position"],
							"length": prevStation["length"]
						}
					oldStation["subStations"].append(subStation)
			else:  # 该站点首次被录入
				station["lineIds"] = [line["id"]]
				station["subStations"] = []
				station["position"] = i
				i = i + 1
				stationListMap[station["name"]] = station
				stationList.append(station)
				
				if nextStation:
					oldNextStation = stationListMap.get(nextStation["name"])
					if oldNextStation:  # 该下一跳站点已通过其他线路，添加到队列中
						subStation = {
							"station": oldNextStation["position"],
							"length": station["length"]
						}
					else:  # 该下一跳站点尚未被录入
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

	for station in stationList:
		for subConfig in station["subStations"]:
			subStation = stationList[subConfig["station"]]
			length = subStation["length"]
			key = "%d-%d" % (station["position"], subStation["position"])
			distanceMap[key] = length

	print(stationCount)
	print(json.dumps(distanceMap, indent=4))

	station = stationListMap.get("天通苑北")
	print("name:%s, position:%d" % (station["name"], station["position"]))

	station2 = stationListMap.get("上地")
	print("name:%s, position:%d" % (station2["name"], station2["position"]))

	(distances, prevNodes) = dijkstra(station)

	print("distance of %s and %s is %d" % (station["name"], station2["name"], distances[station2["position"]]))
	pathList = getStationList(prevNodes, station["position"], station2["position"])
	print(json.dumps(pathList, indent=4))

	print("Running in dijkstra")
