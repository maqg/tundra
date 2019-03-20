



# double a list
def test1():
	numbers = [1, 2, 3, 4, 5]
	new_numbers = [num * 2 for num in numbers if num != 1]
	print(new_numbers)



# rerange a string
def test2():
	data = "a 12  45 99 343   1000"
	new_data = [s for s in data.split(" ") if s != ""]
	print(new_data)



# test enumerate
def test3():
	l = [1, 2, 3, 4, 5]
	for index, s in enumerate(l):
		print("index: %d,s:%s" % (index, s))


def test4():
	a = 1
	b = 2
	a, b = b, a
	print("a: %d, b: %d" % (a, b))


# init a list
def test5():
	l = [0] * 10
	print(l)

	l = [[0]] * 10
	l[0][0] = 1
	print(l)


def test6():
	x = "Hello, My Name is {0}, from {1}, aged {2}".format("Henry", "China", 30)
	print(x)


def test7():
	l = [lambda x: x for x in range(10)]
	print(l[0](0))


if __name__ == "__main__":
	test1()

	test2()

	test3()

	test4()

	test5()

	test6()

	test7()
