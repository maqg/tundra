import math
import operator
from functools import reduce

from PIL import Image
from PIL import ImageFilter


def image_contrast(img1, img2):
	image1 = Image.open(img1)
	image2 = Image.open(img2)
	
	h1 = image1.histogram()
	h2 = image2.histogram()
	
	result = math.sqrt(reduce(operator.add, list(map(lambda a, b: (a - b) ** 2, h1, h2))) / len(h1))
	
	return result


if __name__ == "__main__":
	
	img = Image.open("./test.jpg")
	img2 = Image.open("./test.jpg")
	
	print(image_contrast("./1.jpg", "./2.jpg"))
	print(image_contrast("./1.jpg", "./3.jpg"))
