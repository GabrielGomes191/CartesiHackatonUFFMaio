import cv2
import easyocr

img = cv2.imread("assets\croppedTESTE.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
reader = easyocr.Reader(['pt'])
results = reader.readtext(gray)
ocr = ""
print(results)
for item in results:
    if len(item[1]) == 7:
        ocr = item[1]
print(ocr)
