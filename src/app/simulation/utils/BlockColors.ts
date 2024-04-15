export default function getColor(colorGroup: number) {
  return [
    MinecraftColors.White,
    MinecraftColors.LightGray,
    MinecraftColors.DarkGray,
    MinecraftColors.Black,
    MinecraftColors.Red,
    MinecraftColors.Orange,
    MinecraftColors.Yellow,
    MinecraftColors.LimeGreen,
    MinecraftColors.Green,
    MinecraftColors.LightBlue,
    MinecraftColors.Cyan,
    MinecraftColors.Blue,
    MinecraftColors.Purple,
    MinecraftColors.Magenta,
    MinecraftColors.Pink,
    MinecraftColors.Brown,
  ][colorGroup]
}

export class MinecraftColor {
  constructor(
    public color: number,
    public lightOutline: boolean = false
  ) {}
}

export class MinecraftColors {
  static White = new MinecraftColor(0xeeeeee)
  static LightGray = new MinecraftColor(0xa0a7a7)
  static DarkGray = new MinecraftColor(0x414141, true)
  static Black = new MinecraftColor(0x181414, true)
  static Red = new MinecraftColor(0x9e2b27)
  static Orange = new MinecraftColor(0xea7e35)
  static Yellow = new MinecraftColor(0xc2b51c)
  static LimeGreen = new MinecraftColor(0x39ba2e)
  static Green = new MinecraftColor(0x364b18, true)
  static LightBlue = new MinecraftColor(0x6387d2)
  static Cyan = new MinecraftColor(0x267191)
  static Blue = new MinecraftColor(0x253193, true)
  static Purple = new MinecraftColor(0x7e34bf)
  static Magenta = new MinecraftColor(0xbe49c9)
  static Pink = new MinecraftColor(0xd98199)
  static Brown = new MinecraftColor(0x56331c)
}
