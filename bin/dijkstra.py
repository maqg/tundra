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

distance = [] # 当前节点到源点的距离
prevNode = [] # 当前节点的前一节点
distances = [] # 两点间的长度
visited = []

def dijkstra(station):
	# init something
	for i in range(0, len(stationList)):
		visited.append(False)
		distances.append(MAXINT)




if __name__ == "__main__":
	lineList = fileToObj("./subway.json")
	i = 0

	for line in lineList:
		for station in line["stations"]:
			oldStatoin = stationListMap.get(station["name"])
			if oldStatoin:
				oldStatoin["lineIds"].append(line["id"])
			else:
				station["lineIds"] = [line["id"]]
				station["position"] = i
				i = i + 1
				stationListMap[station["name"]] = station
				stationList.append(station)


	station = stationListMap.get("五道口")
	dijkstra(station)

	print(distances)
	print(visited)

	print("Running in dijkstra")