#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>
void drawCenteredText(Adafruit_ILI9341 tft,String text, int16_t y) {
  // Get text bounds
  int16_t x1, y1;
  uint16_t textWidth, textHeight;
  tft.getTextBounds(text, 0, 0, &x1, &y1, &textWidth, &textHeight);

  // Calculate position for centered text
  int16_t xPos = (tft.width() - textWidth) / 2;

  // Draw text at the calculated position
  tft.setCursor(xPos, y);
  tft.print(text);
}